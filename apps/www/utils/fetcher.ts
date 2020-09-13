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
export function fetcher(url: string, method: Method, body: object = {}, config: RequestInit = {}) {
  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  }).then(checkResponseStatus);
}

class ResponseError extends Error {
  constructor(message: string, public readonly response: Response) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
function checkResponseStatus(response: Response) {
  if (response.ok) {
    return response;
  }
  throw new ResponseError(response.statusText, response);
}
