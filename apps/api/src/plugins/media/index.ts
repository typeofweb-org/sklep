import path from 'path';

import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import getImageDimensions from 'image-size';

import { Enums } from '../../models';

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

const MEDIA_DIR = path.join(process.cwd(), '/media');

export const MediaPlugin: Hapi.Plugin<{}> = {
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
          file,
          ...restPayload
        } = request.payload as SklepTypes['postMediaImagesRequestFormData'];

        assertImageFiletype(file.filename, file.headers);
        const fileExtension = file.filename.split('.').pop() as string;
        await addFileExtension(file.path, fileExtension);
        const filePathWithExtension = `${file.path}.${fileExtension}`;

        const imageDimensions = getImageDimensions(filePathWithExtension);

        try {
          const image = await request.server.app.db.image.create({
            data: {
              path: filePathWithExtension,
              width: imageDimensions.width as number,
              height: imageDimensions.height as number,
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
