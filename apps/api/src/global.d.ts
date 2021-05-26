import 'jest-extended';
import type { PrismaClient } from '@prisma/client';

declare module '@hapi/hapi' {
  export interface ServerApplicationState {
    readonly db: PrismaClient;
  }
}
