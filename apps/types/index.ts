/* eslint-disable */
import { definitions } from './types';

type DeepNil<T extends object> = {
  [K in keyof T]: (undefined extends T[K] ? T[K] | null : T[K]) extends infer R
    ? R extends object
      ? DeepNil<R>
      : R
    : never;
};

type SklepTypes = DeepNil<definitions>;

export { SklepTypes };
