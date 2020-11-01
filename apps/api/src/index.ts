import type { PrismaClient } from '@prisma/client';
import Dotenv from 'dotenv';

import { initDb, prisma } from './db';
import { getServerWithPlugins } from './server';

Dotenv.config();

declare module '@hapi/hapi' {
  export interface ServerApplicationState {
    readonly db: PrismaClient;
  }
}

const start = async () => {
  console.log(await initDb());
  const sklepServer = await getServerWithPlugins();

  // @ts-expect-error
  sklepServer.app.db = prisma;

  await sklepServer.start();

  console.info('Server running at:', sklepServer.info.uri);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
