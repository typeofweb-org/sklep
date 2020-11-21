import fs from 'fs';

import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import Joi from 'joi';

type Paylaod = {
  readonly alt: string;
  readonly description?: string | null;
  readonly productId?: number | null;
};

export function getAllImages(server: Hapi.Server) {
  return server.app.db.image.findMany();
}

export async function getImagePath(server: Hapi.Server, imageId: number) {
  const image = await server.app.db.image.findOne({
    where: {
      id: imageId,
    },
  });

  if (image) {
    return image.path;
  }

  throw Boom.badRequest(`Invalid imageId`);
}

export function updateImage(server: Hapi.Server, imageId: number, payload: Paylaod) {
  return server.app.db.image.update({
    where: {
      id: imageId,
    },
    data: payload,
  });
}

export function deleteImage(filePath: string) {
  return fs.promises.unlink(filePath);
}

export const assertImageFiletype = (filename: string, headers: Record<string, string>) => {
  const filenameSchema = Joi.string()
    .regex(/\.(png|jpg|jpeg|svg|gif)$/)
    .required();

  const contentTypeSchema = Joi.string()
    .equal('image/jpeg', 'image/png', 'image/svg+xml', 'image/gif')
    .required();

  Joi.assert(filename, filenameSchema);
  Joi.assert(headers['content-type'], contentTypeSchema);
};

export const addFileExtension = (filePath: string, fileExtension: string) => {
  return fs.promises.rename(filePath, `${filePath}.${fileExtension}`);
};
