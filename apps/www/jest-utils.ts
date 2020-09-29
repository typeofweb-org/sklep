import type { MockedRequest } from 'msw';
import { setupServer } from 'msw/node';
import { queryCache } from 'react-query';

const getPublicUrlFromRequest = (request: MockedRequest) => {
  const { protocol, host, pathname, origin } = request.url;
  return request.referrer.startsWith(origin) ? pathname : `${protocol}://${host}${pathname}`;
};

export const mswMockServer = setupServer();

beforeAll(() => {
  mswMockServer.listen({
    onUnhandledRequest: (request) => {
      const publicUrl = getPublicUrlFromRequest(request);
      const message = `captured a ${
        request.method
      } ${request.url.toString()} request without a corresponding request handler.

If you wish to intercept this request, consider creating a request handler for it:

rest.${request.method.toLowerCase()}('${publicUrl}', (req, res, ctx) => {
  return res(ctx.text('body'))
})`;
      fail(message);
    },
  });
});

afterEach(() => {
  queryCache.clear();
  mswMockServer.resetHandlers();
});

afterAll(() => {
  mswMockServer.close();
});
