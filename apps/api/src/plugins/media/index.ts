import path from 'path';

import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import getImageDimensions from 'image-size';

import { Enums } from '../../models';

type Split<Str extends string, Del extends string> = Str extends `${infer A}${Del}${infer B}`
  ? // eslint-disable-next-line functional/prefer-readonly-type -- expected
    [A, ...Split<B, Del>]
  : // eslint-disable-next-line functional/prefer-readonly-type -- expected
    [Str];
const split = <Str extends string, Del extends string>(str: Str, del: Del) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- expected
  str.split(del) as unknown as Split<Str, Del>;

type Last<Arr extends readonly unknown[]> = Arr extends readonly [...infer _, infer Head]
  ? Head
  : never;

const pop = <Arr extends readonly unknown[]>(arr: Arr) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ok
  return arr.pop() as Last<Arr>;
};

import {
  getImagePath,
  deleteImage,
  getAllImages,
  updateImage,
  assertImageFiletype,
  addFileExtension,
} from './mediaFunctions';
import {
  deleteImageParamsSchema,
  getAllImagesResponseSchema,
  postImagePayloadSchema,
  postImageResponseSchema,
  putImageParamsSchema,
  putImagePayloadSchema,
  putImageResponseSchema,
} from './mediaSchemas';

const assertImageFiletype2: (
  filename: string,
  headers: Record<string, string>,
) => asserts filename is
  | `${string}.png`
  | `${string}.jpg`
  | `${string}.jpeg`
  | `${string}.svg`
  | `${string}.gif` = assertImageFiletype;

const MEDIA_DIR = path.join(process.cwd(), '/media');

export const MediaPlugin: Hapi.Plugin<Record<string, never>> = {
  name: 'MediaPlugin',
  register(server) {
    server.route({
      method: 'POST',
      path: '/images',
      options: {
        tags: ['api', 'media'],
        auth: {
          scope: Enums.UserRole.ADMIN,
        },
        plugins: {
          'hapi-swagger': {
            payloadType: 'form',
          },
        },
        payload: {
          allow: 'multipart/form-data',
          multipart: {
            output: 'file',
          },
          uploads: MEDIA_DIR,
          maxBytes: 32 * 1024 * 1024,
          parse: true,
        },
        response: {
          schema: postImageResponseSchema,
        },
        validate: {
          payload: postImagePayloadSchema,
        },
      },
      async handler(request) {
        const {
          file: { filename, headers, path },
          ...restPayload
        } =
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- formData
          request.payload as SklepTypes['postMediaImagesRequestFormData'];

        assertImageFiletype2(filename, headers);
        const fileExtension = pop(split(filename, '.'));
        await addFileExtension(path, fileExtension);
        const filePathWithExtension = `${path}.${fileExtension}`;

        const imageDimensions = getImageDimensions(filePathWithExtension);
        if (!imageDimensions.width || !imageDimensions.height) {
          throw Boom.badData();
        }

        try {
          const image = await request.server.app.db.image.create({
            data: {
              path: filePathWithExtension,
              width: imageDimensions.width,
              height: imageDimensions.height,
              ...restPayload,
            },
          });
          return { data: image };
        } catch (e) {
          await deleteImage(filePathWithExtension);
          throw Boom.internal('image record could not be created in database');
        }
      },
    });

    server.route({
      method: 'GET',
      path: '/images',
      options: {
        auth: {
          scope: Enums.UserRole.ADMIN,
        },
        tags: ['api', 'images'],
        response: {
          schema: getAllImagesResponseSchema,
        },
      },
      async handler(request) {
        const images = await getAllImages(request.server);

        return {
          data: images,
        };
      },
    });

    server.route({
      method: 'PUT',
      path: '/images/{imageId}',
      options: {
        tags: ['api', 'media'],
        auth: {
          scope: Enums.UserRole.ADMIN,
        },
        validate: {
          params: putImageParamsSchema,
          payload: putImagePayloadSchema,
        },
        response: {
          schema: putImageResponseSchema,
        },
      },
      async handler(request) {
        const id = Number(request.params?.imageId);
        const image = await updateImage(
          request.server,
          id,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- body
          request.payload as SklepTypes['putMediaImagesImageIdRequestBody'],
        );
        return {
          data: image,
        };
      },
    });

    server.route({
      method: 'DELETE',
      path: '/images/{imageId}',
      options: {
        tags: ['api', 'images'],
        auth: {
          scope: Enums.UserRole.ADMIN,
        },
        validate: {
          params: deleteImageParamsSchema,
        },
      },
      async handler(request) {
        const id = Number(request.params?.imageId);
        const imagePath = await getImagePath(request.server, id);
        await Promise.allSettled([
          deleteImage(imagePath),
          request.server.app.db.image.delete({
            where: {
              id,
            },
          }),
        ]);

        return null;
      },
    });
  },
};
