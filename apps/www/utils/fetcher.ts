export async function fetcher(
  url: string,
  method: string = 'GET',
  body: object = {},
  config: RequestInit = {},
) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
    ...config,
  });
  if (response.status === 204) {
    return Promise.resolve();
  }

  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw data;
}
