export type Get<Obj extends object | null | undefined, Keys extends (keyof any)[]> = {
  0: Obj;
  1: _Get<Obj, _Head<Keys>> extends infer R ? (R extends object ? Get<R, _Tail<Keys>> : R) : never;
}[Keys['length'] extends 0 ? 0 : 1];

export type _Get<
  Obj extends object | null | undefined,
  Keys extends keyof any
> = Keys extends keyof NonNullable<Obj> ? NonNullable<Obj>[Keys] : undefined | null;

type _Head<Arr extends any[]> = Arr['length'] extends 0 ? never : Arr[0];

type _Tail<Arr extends any[]> = ((...t: Arr) => any) extends (head: any, ...tail: infer Tail) => any
  ? Tail
  : never;
