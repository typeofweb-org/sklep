import Hapi from "@hapi/hapi";
import Bell from "@hapi/bell";
import HapiAuthCookie from "@hapi/cookie";
import ms from "ms";
import type { Models } from "../../models";
import Joi from "joi";

type AuthPluginOptions = {
  cookiePassword: string;
  isProduction: boolean;
  cookieDomain: string;
};

declare module "@hapi/hapi" {
  interface AuthCredentials {
    session: Models["session"] & {
      user: Omit<Models["user"], "password">;
    };
  }
}

const meAuthSchema = Joi.object({
  id: Joi.string().required(),
  validUntil: Joi.date().required(),
  userId: Joi.number().required(),
  user: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().optional().allow(""),
    email: Joi.string().required(),
    role: Joi.string().required(),
  }).required(),
});

export const AuthPlugin: Hapi.Plugin<AuthPluginOptions> = {
  multiple: false,
  name: "Sklep Auth Plugin",
  version: "1.0.0",
  async register(server, options) {
    await server.register(Bell);
    await server.register(HapiAuthCookie);

    const cookieOptions: HapiAuthCookie.Options = {
      cookie: {
        name: "session",
        password: options.cookiePassword,
        ttl: ms("7 days"),
        encoding: "iron",
        isSecure: options.isProduction,
        isHttpOnly: true,
        clearInvalid: true,
        strictHeader: true,
        isSameSite: "Lax",
        domain: options.cookieDomain,
        path: "/",
      },
      async validateFunc(request, session: { id?: string } | undefined) {
        const sessionId = session?.id;
        if (!sessionId || !request) {
          return { valid: false };
        }

        const [sessionModel] = await request.server.app.db.session.findMany({
          where: {
            id: sessionId,
            validUntil: {
              gte: new Date(),
            },
          },
          take: 1,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        });

        if (!sessionModel) {
          request?.cookieAuth.clear();
          return { valid: false };
        }

        // await maybeUpdateSessionValidity(sessionModel);

        const scope = [
          "user",
          `user-${sessionModel.userId}`,
          `role-${sessionModel.user.role}`,
        ];

        return { valid: true, credentials: { session: sessionModel, scope } };
      },
    };
    server.auth.strategy("session", "cookie", cookieOptions);
    server.auth.default("session");

    server.route({
      method: "POST",
      path: "/logout",
      options: {
        tags: ["api", "oauth"],
        auth: {
          mode: "try",
          strategy: "session",
        },
      },
      async handler(request) {
        request.cookieAuth.clear();
        if (request.auth.credentials && request.auth.credentials.session) {
          await request.server.app.db.session.delete({
            where: {
              id: request.auth.credentials.session.id,
            },
          });
        }

        return null;
      },
    });

    await server.route({
      method: "GET",
      path: "/me",
      options: {
        tags: ["api", "oauth"],
        auth: {
          mode: "try",
          strategy: "session",
        },
        response: {
          schema: Joi.object({
            data: meAuthSchema.required().allow(null),
          }).required(),
        },
      },
      async handler(request) {
        if (request.auth.credentials?.session) {
          return { data: request.auth.credentials.session };
        }

        return { data: null };
      },
    });
  },
};
