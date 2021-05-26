import * as Prisma from '@prisma/client';

type PrismaDelegates = Pick<Prisma.PrismaClient, ReadonlyKeys<Prisma.PrismaClient>>;
type Awaited<T> = T extends Promise<infer R> ? R : never;

export type Models = {
  readonly [K in keyof PrismaDelegates]: 'findFirst' extends keyof PrismaDelegates[K]
    ? NonNullable<Awaited<ReturnType<PrismaDelegates[K]['findFirst']>>>
    : never;
};

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B;

// eslint-disable-next-line functional/prefer-readonly-type -- not readonly
type ReadonlyKeys<T> = {
  // eslint-disable-next-line functional/prefer-readonly-type -- not readonly
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
  // eslint-disable-next-line functional/prefer-readonly-type -- not readonly
}[keyof T];

type EnumsKeys = {
  readonly [K in keyof typeof Prisma]: typeof Prisma[K] extends Record<string, unknown>
    ? typeof Prisma[K] extends (...args: readonly unknown[]) => unknown
      ? never
      : K
    : never;
}[keyof typeof Prisma];

export type Enums = Pick<typeof Prisma, EnumsKeys>;
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- extracting enums from Prisma
export const Enums = Prisma as Enums;
