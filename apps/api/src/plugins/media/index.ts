import path from 'path';

import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import { v4 as uuidv4 } from 'uuid';

import { Enums } from '../../models';

import {
  getImagePath,
  deleteImage,
  createImage,
  getAllImages,
  updateImage,
} from './mediaFunctions';
import {
  deleteImageParamsSchema,
  postImagePayloadSchema,
  putImageParamsSchema,
  putImagePayloadSchema,
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
        auth: false, // Test purposes {
        //scope: Enums.UserRole.ADMIN,
        //}
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
          uploads: process.cwd(),
          maxBytes: 32 * 1024 * 1024,
          parse: true,
        },
        validate: {
          payload: postImagePayloadSchema,
        },
      },
      handler(request, h) {
        const {
          file,
          ...restPayload
        } = request.payload as SklepTypes['postMediaImagesRequestFormData'];

        console.log(request.payload);

        // const uuid = uuidv4();
        // const extension = file.hapi.filename.split('.').pop();
        // const filePath = path.join(MEDIA_DIR, `${uuid}.${extension}`);
        // await Promise.allSettled([
        //   request.server.app.db.image.create({
        //     data: {
        //       path: filePath,
        //       ...restPayload,
        //     },
        //   }),
        // ]);

        return null;
      },
    });

    server.route({
      method: 'GET',
      path: '/images',
      options: {
        tags: ['api', 'images'],
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
        validate: {
          params: putImageParamsSchema,
          payload: putImagePayloadSchema,
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
