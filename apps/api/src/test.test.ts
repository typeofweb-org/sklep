import { prisma } from './db';
import { getServerWithPlugins } from './server';

const getServerForTest = async () => {
  const server = await getServerWithPlugins();

  // @note we could replace this with a mock in the future
  // @ts-expect-error
  server.app.db = prisma;

  return server;
};

describe('/auth', () => {
  describe('/me', () => {
    it(`should return nothing when I'm not logged in`, async () => {
      const server = await getServerForTest();

      const injection = await server.inject({
        method: 'GET',
        url: '/auth/me',
      });

      expect(injection.result).toEqual({ data: null });
    });
  });
  describe('/register', () => {
    it(`should return 400 TOO_EASY because the password is easy`, async () => {
      const server = await getServerForTest();

      const injection = await server.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'test@typeofweb.com',
          password: '123123123',
        },
      });

      expect(injection.statusCode).toEqual(400);
      expect(injection.result).toHaveProperty('message', 'TOO_EASY');
    });
  });
});
