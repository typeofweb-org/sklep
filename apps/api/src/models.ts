import type { PrismaClient } from "@prisma/client";

type PrismaDelegates = Pick<PrismaClient, ReadonlyKeys<PrismaClient>>;
type Awaited<T> = T extends Promise<infer R> ? R : never;

export type Models = {
  [K in keyof PrismaDelegates]: NonNullable<
    Awaited<ReturnType<PrismaDelegates[K]["findOne"]>>
  >;
};

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];
