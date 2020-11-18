import fs from 'fs';

import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';

type Paylaod = {
  readonly alt: string;
  readonly description?: string;
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

export function createImage(filePath: string, fileStream: fs.ReadStream) {
  const writeStream = fs.createWriteStream(filePath);
  fileStream.pipe(writeStream);
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
