import type Hapi from '@hapi/hapi';
import Cookie from 'cookie';
import Faker from 'faker';

import { prisma } from './src/db';
import { Enums } from './src/models';
import { getServerWithPlugins } from './src/server';

export const getServerForTest = async () => {
  const server = await getServerWithPlugins();

  // @note we could replace this with a mock in the future
  // @ts-expect-error
  server.app.db = prisma;

  return server;
};

export const createAndAuthRole = async (
  server: Hapi.Server,
  role: keyof Enums['UserRole'] = Enums.UserRole.ADMIN,
) => {
  const firstName = Faker.name.firstName();
  const lastName = Faker.name.lastName();
  const email = Faker.internet.email(firstName, lastName, 'typeofweb.com');
  const password = 'asdASD123!@#';

  await server.inject({
    method: 'POST',
    url: '/auth/register',
    payload: {
      email,
      password,
    },
  });
  await server.app.db.user.update({ where: { email }, data: { role } });

  const loginInjection = await server.inject({
    method: 'POST',
    url: '/auth/login',
    payload: {
      email,
      password,
    },
  });
  const cookies = loginInjection.headers['set-cookie'];
  const parsedCookies = Cookie.parse(String(cookies ?? ''));

  return {
    email,
    password,
    headers: {
      Cookie: `session=${parsedCookies['session']}`,
    },
  };
};

export const repeatRequest = <T>(n: number, fn: () => Promise<T>): Promise<readonly T[]> => {
  const repetitions = Array.from({ length: n }, () => fn());
  return Promise.all(repetitions);
};
