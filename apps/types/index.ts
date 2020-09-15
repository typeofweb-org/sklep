/* eslint-disable */
import { definitions } from './types';

type DeepNil<T extends object> = {
  [K in keyof T]: (undefined extends T[K] ? T[K] | null : T[K]) extends infer R
    ? R extends object
      ? DeepNil<R>
      : R
    : never;
};

// pretty-print type
type _2LevelsPretty<T> = {
  [K in keyof T]: T[K] extends object ? { [L in keyof T[K]]: T[K][L] } : T[K];
};

export type SklepTypes = _2LevelsPretty<DeepNil<definitions>>;
