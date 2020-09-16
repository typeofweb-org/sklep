import { Models } from './models';
export type Nil<T> = T | undefined | null;

export type Model<T extends Partial<Models[keyof Models]>> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export type Awaited<T> = T extends Promise<infer R> ? R : T;
