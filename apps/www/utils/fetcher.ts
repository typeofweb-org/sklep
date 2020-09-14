import { SklepTypes } from '@sklep/types';
import { difference } from 'ramda';

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
  CurrentMethod extends Method
> = SklepTypes['pathsDefinitions'][CurrentPath] extends { [K in CurrentMethod]: any }
  ? SklepTypes['pathsDefinitions'][CurrentPath][CurrentMethod] extends { requestBody: infer R }
    ? R
    : undefined
  : undefined;
type ParamsType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = SklepTypes['pathsDefinitions'][CurrentPath] extends { [K in CurrentMethod]: any }
  ? SklepTypes['pathsDefinitions'][CurrentPath][CurrentMethod] extends {
      requestPathParams: infer R;
    }
    ? R
    : undefined
  : undefined;
type ResponseType<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = SklepTypes['pathsDefinitions'][CurrentPath] extends { [K in CurrentMethod]: any }
  ? SklepTypes['pathsDefinitions'][CurrentPath][CurrentMethod] extends { response: infer R }
    ? R extends string // Swagger types empty responses as "string" but we never respond with just strings
      ? never
      : R
    : never
  : never;

type FetcherConfigCommon = { config?: RequestInit };
type FetcherConfig<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = FetcherConfigCommon &
  (BodyType<CurrentPath, CurrentMethod> extends object
    ? { body: BodyType<CurrentPath, CurrentMethod> }
    : { body?: never }) &
  (ParamsType<CurrentPath, CurrentMethod> extends object
    ? { params: ParamsType<CurrentPath, CurrentMethod> }
    : { params?: never });

export function findMismatchingParams(requiredParams: string[], params: object) {
  const providedParams = Object.keys(params);

  const excessParams = difference(providedParams, requiredParams);
  const missingParams = difference(requiredParams, providedParams);
  return {
    excessParams,
    missingParams,
  };
}

const PARAMS_PATTERN = /{(\w+)}/g;
export function compileUrl<CurrentPath extends keyof SklepTypes['pathsDefinitions']>(
  path: CurrentPath,
  params?: Record<string, any>,
): string {
  if (!params) {
    return process.env.NEXT_PUBLIC_API_URL + path;
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

  const compiledPath = path.replace(PARAMS_PATTERN, (_, param) => params[param]);
  return process.env.NEXT_PUBLIC_API_URL + compiledPath;
}

export async function fetcher<
  CurrentPath extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
>(
  path: CurrentPath,
  method: CurrentMethod,
  { body, params, config }: FetcherConfig<CurrentPath, CurrentMethod>,
): Promise<ResponseType<CurrentPath, CurrentMethod>> {
  const url = compileUrl(path, params);
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
    return data;
  }
  throw new ResponseError(response.statusText, response.status, data);
}

class ResponseError extends Error {
  constructor(message: string, public readonly status: number, public readonly data: unknown) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

async function getJSON(response: Response) {
  const contentType = response.headers.get('Content-Type');
  const emptyCodes = [204, 205];
  if (!emptyCodes.includes(response.status) && contentType?.includes('json')) {
    return response.json();
  } else {
    return undefined;
  }
}
