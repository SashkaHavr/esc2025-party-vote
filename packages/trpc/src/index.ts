import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { Context as HonoContext } from 'hono';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { createContext } from '#context.ts';
import { router } from '#init.ts';
import { userRouter } from '#routers/user.ts';
import { publicProcedure } from './init';

const appRouter = router({
  health: publicProcedure.query(() => 'Healthy!'),
  user: userRouter,
});

export function trpcHandler({
  request,
  c,
}: {
  request: Request;
  c: HonoContext;
}) {
  return fetchRequestHandler({
    req: request,
    router: appRouter,
    endpoint: '/trpc',
    createContext: (opts) => createContext(opts, c),
  });
}

export type TRPCRouter = typeof appRouter;
// export function createTRPCCaller(
//   props: Parameters<typeof createContextRaw>[0],
// ) {
//   return createCallerFactory(appRouter)(createContextRaw(props));
// }

export type TRPCInput = inferRouterInputs<TRPCRouter>;
export type TRPCOutput = inferRouterOutputs<TRPCRouter>;
