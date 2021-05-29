import type { PrismaError } from './prisma-errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any
export function isPrismaError(err: any): err is PrismaError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ok
  return Boolean(err?.code) && /^P\d{4}$/.test(err.code);
}
