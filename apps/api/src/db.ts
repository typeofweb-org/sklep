import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const initDb = async () => {
  const result = await prisma.$queryRaw`SELECT 1=1 AS "database ready";`;
  return result[0];
};
