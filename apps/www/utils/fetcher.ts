import { SklepTypes } from '@sklep/types';

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
  CurrentUrl extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = SklepTypes['pathsDefinitions'][CurrentUrl] extends { [K in CurrentMethod]: any }
  ? SklepTypes['pathsDefinitions'][CurrentUrl][CurrentMethod] extends { requestBody: infer R }
    ? R
    : undefined
  : undefined;
type ResponseType<
  CurrentUrl extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = SklepTypes['pathsDefinitions'][CurrentUrl] extends { [K in CurrentMethod]: any }
  ? SklepTypes['pathsDefinitions'][CurrentUrl][CurrentMethod] extends { response: infer R }
    ? R extends string // Swagger types empty responses as "string" but we never respond with just strings
      ? never
      : R
    : never
  : never;

type FetcherConfigCommon = { config?: RequestInit };
type FetcherConfig<
  CurrentUrl extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = FetcherConfigCommon &
  (BodyType<CurrentUrl, CurrentMethod> extends object
    ? { body: BodyType<CurrentUrl, CurrentMethod> }
    : { body?: never });

export async function fetcher<
  CurrentUrl extends keyof SklepTypes['pathsDefinitions'],
  CurrentMethod extends Method
>(
  url: CurrentUrl,
  method: CurrentMethod,
  { body, config }: FetcherConfig<CurrentUrl, CurrentMethod>,
): Promise<ResponseType<CurrentUrl, CurrentMethod>> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
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
