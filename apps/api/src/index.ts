import Dotenv from 'dotenv';

import { initDb, prisma } from './db';
import { getServerWithPlugins } from './server';

Dotenv.config();

const start = async () => {
  console.log(await initDb());
  const sklepServer = await getServerWithPlugins();

  // @ts-expect-error this field is readonly
  sklepServer.app.db = prisma;

  await sklepServer.start();

  console.info('Server running at:', sklepServer.info.uri);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
