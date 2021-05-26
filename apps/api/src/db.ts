import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const initDb = async () => {
  const result = await client.$queryRaw<
    ReadonlyArray<Record<string, unknown>>
  >`SELECT 1=1 AS "database ready";`;
  return result[0];
};

/**
 * @deprecated Use `request.server.app.db` instead
 */
export const prisma = client;
