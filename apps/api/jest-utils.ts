import Hapi from '@hapi/hapi';
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

  return {
    email,
    password,
    headers: {
      Cookie: cookies[0].split(';')[0],
    },
  };
};

export const repeatRequest = <T>(n: number, fn: () => Promise<T>): Promise<T[]> => {
  const repetitions = Array.from({ length: n }, () => fn());
  return Promise.all(repetitions);
};
