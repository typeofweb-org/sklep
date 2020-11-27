import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import type { ValidationErrorItem } from 'joi';
import Joi from 'joi';

import pkg from '../package.json';

import { getConfig, isProd, isStaging } from './config';
import {
  addProductRoute,
  deleteProductRoute,
  editProductRoute,
  getProductsRoute,
  getProductRoute,
} from './modules/products/productRoutes';
import {
  addTaxRoute,
  deleteTaxRoute,
  editTaxRoute,
  getTaxesRoute,
  getTaxRoute,
} from './modules/products/taxesRoutes';
import { AuthPlugin } from './plugins/auth';
import { CartPlugin } from './plugins/cart';
import { OrderPlugin } from './plugins/order';
import { isPrismaError } from './prisma/prisma-helpers';

function errorHasDetails(
  err: any,
): err is Boom.Boom & { readonly details: readonly ValidationErrorItem[] } & {
  readonly output: Boom.Output & {
    readonly payload: Boom.Payload & {
      // eslint-disable-next-line functional/prefer-readonly-type
      details: readonly Omit<ValidationErrorItem, 'context'>[];
    };
  };
} {
  return (
    err instanceof Error &&
    Boom.isBoom(err) &&
    'details' in err &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Array.isArray((err as any).details)
  );
}

const getServer = () => {
  return new Hapi.Server({
    host: getConfig('HOST'),
    port: getConfig('PORT'),
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
      },
      response: {
        modify: true,
        options: {
          allowUnknown: false,
          convert: true,
        },
      },
      validate: {
        options: {
          abortEarly: false,
          errors: {
            render: false,
          },
        },
        failAction(_request, _h, err) {
          if (errorHasDetails(err)) {
            err.output.payload.details = err.details.map(({ message, path, type }) => ({
              message,
              path,
              type,
            }));
          }
          throw err;
        },
      },
    },
  });
};

export const getServerWithPlugins = async () => {
  const server = getServer();
  server.validator(Joi);

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: `${pkg.name} Documentation`,
      version: getConfig('ENV') + '-' + pkg.version + '-',
      // fs.readFileSync(".version", "utf-8").trim(),
    },
    auth: false,
  };

  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.register(
    {
      plugin: AuthPlugin,
      options: {
        cookieDomain: getConfig('COOKIE_DOMAIN'),
        isProduction: isProd() || isStaging(),
        cookiePassword: getConfig('COOKIE_PASSWORD'),
      },
    },
    {
      routes: {
        prefix: '/auth',
      },
    },
  );

  await server.register(
    {
      plugin: OrderPlugin,
      options: {
        stripeApiKey: getConfig('STRIPE_API_KEY'),
      },
    },
    {
      routes: {
        prefix: '/orders',
      },
    },
  );

  await server.register(
    {
      plugin: CartPlugin,
      options: {
        cookiePassword: getConfig('CART_COOKIE_PASSWORD'),
      },
    },
    {
      routes: {
        prefix: '/cart',
      },
    },
  );

  server.events.on({ name: 'request', channels: 'error' }, (_request, event, _tags) => {
    // const baseUrl = `${server.info.protocol}://${request.info.host}`;
    console.error(event.error);
  });

  server.ext('onPreResponse', ({ response }, h) => {
    const res = response as unknown;
    if (isPrismaError(res)) {
      switch (res.code) {
        case 'P2002':
          return Boom.conflict(JSON.stringify(res.meta));
      }
    }
    return h.continue;
  });

  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
    handler(request) {
      if (request.auth.isAuthenticated) {
        return request.auth.credentials;
      }

      return `<h1>Stay awhile and listen.</h1> <h2>You're not logged in.</h2>`;
    },
  });

  server.route(addProductRoute);
  server.route(editProductRoute);
  server.route(getProductRoute);
  server.route(getProductsRoute);
  server.route(deleteProductRoute);
  server.route(addTaxRoute);
  server.route(getTaxRoute);
  server.route(getTaxesRoute);
  server.route(editTaxRoute);
  server.route(deleteTaxRoute);

  return server;
};
