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
    body: JSON.stringify(body),
    ...config,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw data;
}
