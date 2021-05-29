import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useParams = <T extends string>(required: readonly T[] = []) => {
  const params = useRouter().query;

  const missingParams = required
    .map((param: string) => (params[param] == null ? param : undefined))
    .filter((param): param is string => typeof param === 'string');
  if (missingParams.length > 0) {
    throw new Error(`Missing params ${missingParams.join(', ')}!`);
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- OK
  return params as { readonly [K in T]: string };
};
