import type { SklepTypes } from '@sklep/types';
import { difference } from 'ramda';
import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

import type { Get } from './fetcherTypes';

type Method =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

type BodyType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
> = Get<
  SklepTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestBody']
> extends infer R
  ? R
  : undefined;

type ParamsType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
> = Get<
  SklepTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestPathParams']
> extends infer R
  ? R
  : undefined;

type QueryType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
> = Get<
  SklepTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestQuery']
> extends infer R
  ? R
  : undefined;

type ResponseType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
> = Get<
  SklepTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'response']
> extends infer R
  ? R extends string // Swagger types empty responses as "string" but we never respond with just strings
    ? never
    : R
  : never;

/* eslint-disable @typescript-eslint/ban-types -- we use a lot of `object` here */
type FetcherConfigCommon = { readonly config?: RequestInit };
type FetcherConfig<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
> = FetcherConfigCommon &
  (BodyType<CurrentPath, CurrentMethod> extends object
    ? { readonly body: BodyType<CurrentPath, CurrentMethod> }
    : { readonly body?: never }) &
  (ParamsType<CurrentPath, CurrentMethod> extends object
    ? { readonly params: ParamsType<CurrentPath, CurrentMethod> }
    : { readonly params?: never }) &
  (QueryType<CurrentPath, CurrentMethod> extends object
    ? { readonly query: QueryType<CurrentPath, CurrentMethod> }
    : { readonly query?: never });

export function findMismatchingParams(requiredParams: readonly string[], params: object) {
  const providedParams = Object.keys(params);

  const excessParams = difference(providedParams, requiredParams);
  const missingParams = difference(requiredParams, providedParams);
  return {
    excessParams,
    missingParams,
  };
}
/* eslint-enable @typescript-eslint/ban-types */

const PARAMS_PATTERN = /{(\w+)}/g;
export function compileUrl<CurrentPath extends keyof SklepTypes['pathsDefinitions']>(
  path: CurrentPath,
  params?: Record<string, string>,
  query?: Record<string, string>,
): string {
  const queryString = query ? '?' + new URLSearchParams(query).toString() : '';

  if (!params) {
    return `${process.env.NEXT_PUBLIC_API_URL}${path}${queryString}`;
  }
  const requiredParams = [...path.matchAll(PARAMS_PATTERN)].map((match) => match[1]);
  const { excessParams, missingParams } = findMismatchingParams(requiredParams, params);
  if (excessParams.length > 0 || missingParams.length > 0) {
    throw new Error(
      `Invalid params. Excessive params: ${JSON.stringify(
        excessParams,
      )}; Missing params: ${JSON.stringify(missingParams)}`,
    );
  }

  const compiledPath = path.replace(PARAMS_PATTERN, (_, param: string) => params[param]);
  return `${process.env.NEXT_PUBLIC_API_URL}${compiledPath}${queryString}`;
}

export async function fetcher<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
>(
  path: CurrentPath,
  method: CurrentMethod,
  { body, params, config, query }: FetcherConfig<CurrentPath, CurrentMethod>,
): Promise<ResponseType<CurrentPath, CurrentMethod>> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- compileUrl requires a record
  const url = compileUrl(path, params as Record<string, string>, query as Record<string, string>);
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(body && { body: JSON.stringify(body) }),
    ...config,
  });
  const data = await getJSON(response);
  if (response.ok) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- we're trusting swagger
    return data as ResponseType<CurrentPath, CurrentMethod>;
  }

  throw new ResponseError(response.statusText, response.status, data);
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status: number, public readonly data: unknown) {
    super(message);
    // eslint-disable-next-line functional/no-this-expression -- ok
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

function getJSON(response: Response): Promise<unknown | undefined> {
  const contentType = response.headers.get('Content-Type');
  const emptyCodes = [204, 205];
  if (!emptyCodes.includes(response.status) && contentType?.includes('json')) {
    return response.json();
  } else {
    return Promise.resolve(undefined);
  }
}

export const useToWQuery = <
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method,
>(
  [path, method, config]: readonly [
    CurrentPath,
    CurrentMethod,
    FetcherConfig<CurrentPath, CurrentMethod>,
  ],
  queryConfig?: UseQueryOptions<ResponseType<CurrentPath, CurrentMethod>>,
) =>
  useQuery(
    [path, method, config],
    () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const promise = fetcher(path, method, { ...config, config: { signal } });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any -- react query abort
      (promise as any).cancel = () => controller.abort();

      return promise;
    },
    queryConfig,
  );
