import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import z, { ZodError } from 'zod/v4';

import { envServer } from '@esc-party-vote/env/server';

import type { Context } from '#context.ts';
import { cookieSchema } from '#utils/cookies.ts';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? z.prettifyError(error.cause) : null,
      },
    };
  },
});

export const router = t.router;

export const publicProcedure =
  envServer.NODE_ENV == 'production'
    ? t.procedure
    : t.procedure.use(async ({ next }) => {
        const result = await next();
        if (
          !result.ok &&
          [
            'INTERNAL_SERVER_ERROR',
            'NOT_IMPLEMENTED',
            'BAD_GATEWAY',
            'SERVICE_UNAVAILABLE',
            'SERVICE_UNAVAILABLE',
          ].includes(result.error.code)
        ) {
          console.error(result.error);
        }
        return result;
      });

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const cookie = ctx.getCookie('auth');
  if (!cookie) {
    throw new TRPCError({
      message: 'You must authenticate to use this endpoint',
      code: 'UNAUTHORIZED',
    });
  }
  const user = cookieSchema.parse(JSON.parse(cookie));
  return next({
    ctx: {
      ...ctx,
      user: user,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
