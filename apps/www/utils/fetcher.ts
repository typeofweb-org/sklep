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
export async function fetcher(
  url: string,
  method: Method,
  body: object = {},
  config: RequestInit = {},
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
    const data = await getJSON(response);

    return data;
  } catch (e) {
    return e;
  }
}

class ResponseError extends Error {
  constructor(message: string, public readonly response: Response) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

async function getJSON(response: Response) {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    const emptyCodes = [204, 205];
    if (!emptyCodes.includes(response.status) && contentType?.includes('json')) {
      return response.json();
    } else {
      return Promise.resolve();
    }
  }
  throw new ResponseError(response.statusText, response);
}
