import Crypto from 'crypto';

import Bell from '@hapi/bell';
import Boom from '@hapi/boom';
import HapiAuthCookie from '@hapi/cookie';
import Hapi from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import ms from 'ms';

import type { Models } from '../../models';

import {
  loginPayloadSchema,
  LoginPayloadSchema,
  MeAuthResponseSchema,
  meAuthResponseSchema,
} from './authSchemas';

type AuthPluginOptions = {
  cookiePassword: string;
  isProduction: boolean;
  cookieDomain: string;
};

declare module '@hapi/hapi' {
  interface AuthCredentials {
    session: Models['session'] & {
      user: Omit<Models['user'], 'password'>;
    };
  }
}

const sessionInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
};

const SESSION_VALIDITY = ms('2 weeks');

export const AuthPlugin: Hapi.Plugin<AuthPluginOptions> = {
  multiple: false,
  name: 'Sklep Auth Plugin',
  version: '1.0.0',
  async register(server, options) {
    await server.register(Bell);
    await server.register(HapiAuthCookie);

    const cookieOptions: HapiAuthCookie.Options = {
      cookie: {
        name: 'session',
        password: options.cookiePassword,
        ttl: ms('7 days'),
        encoding: 'iron',
        isSecure: options.isProduction,
        isHttpOnly: true,
        clearInvalid: true,
        strictHeader: true,
        isSameSite: 'Lax',
        domain: options.cookieDomain,
        path: '/',
      },
      async validateFunc(request, session: { id?: string } | undefined) {
        const sessionId = session?.id;
        if (!sessionId || !request) {
          return { valid: false };
        }

        await request.server.app.db.session.deleteMany({
          where: {
            validUntil: {
              lt: new Date(),
            },
          },
        });

        const [sessionModel] = await request.server.app.db.session.findMany({
          where: {
            id: sessionId,
          },
          take: 1,
          include: sessionInclude,
        });

        if (!sessionModel) {
          request?.cookieAuth.clear();
          return { valid: false };
        }

        // await maybeUpdateSessionValidity(sessionModel);

        const scope = ['user', `user-${sessionModel.userId}`, `role-${sessionModel.user.role}`];

        return { valid: true, credentials: { session: sessionModel, scope } };
      },
    };
    server.auth.strategy('session', 'cookie', cookieOptions);
    server.auth.default('session');

    server.route({
      method: 'POST',
      path: '/login',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
        validate: {
          payload: loginPayloadSchema,
        },
      },
      async handler(request) {
        if (request.auth.isAuthenticated) {
          return null;
        }
        const { email, password } = request.payload as LoginPayloadSchema;
        const user = await request.server.app.db.user.findOne({
          where: { email },
        });

        if (!user) {
          throw Boom.unauthorized();
        }

        const arePasswordsEqual = await Bcrypt.compare(password, user.password);

        if (!arePasswordsEqual) {
          throw Boom.unauthorized();
        }

        const session = await request.server.app.db.session.create({
          data: {
            id: Crypto.randomBytes(32).toString('hex'),
            validUntil: new Date(Date.now() + SESSION_VALIDITY),
            user: {
              connect: user,
            },
          },
          include: sessionInclude,
        });

        request.cookieAuth.set(session);

        return null;
      },
    });

    server.route({
      method: 'POST',
      path: '/logout',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
      },
      async handler(request) {
        request.cookieAuth.clear();
        if (request.auth.credentials?.session) {
          await request.server.app.db.session.delete({
            where: {
              id: request.auth.credentials.session.id,
            },
          });
        }

        return null;
      },
    });

    server.route({
      method: 'GET',
      path: '/me',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
        response: {
          schema: meAuthResponseSchema,
        },
      },
      async handler(request): Promise<MeAuthResponseSchema | { data: null }> {
        if (request.auth.credentials?.session) {
          return { data: request.auth.credentials.session };
        }

        return { data: null };
      },
    });
  },
};
