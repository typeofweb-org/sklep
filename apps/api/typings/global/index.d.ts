interface Array<T> {
  // pop(): T extends readonly [infer Head, ...infer _] ? Head : T | undefined;
  pop(): typeof this extends readonly [infer Head, ...infer _] ? 1 : 0;
  includes(searchElement: unknown, fromIndex?: number): searchElement is T;
}

interface ReadonlyArray<T> {
  pop(): T extends readonly [infer Head, ...infer _] ? Head : T | undefined;
  includes(searchElement: unknown, fromIndex?: number): searchElement is T;
}
