export async function fetcher<U, T = undefined>(
  url: string,
  method: string = 'GET',
  body?: T,
  config: RequestInit = {},
): Promise<U> {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
    ...config,
  });
  if (response.status === 204) return Promise.resolve();
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw data;
}
