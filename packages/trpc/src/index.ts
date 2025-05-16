import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { createContext, createContextRaw } from '#context.ts';
import { createCallerFactory, router } from '#init.ts';
import { publicProcedure } from './init';

const appRouter = router({
  health: publicProcedure.query(() => null),
});

export function trpcHandler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: appRouter,
    endpoint: '/trpc',
    createContext: createContext,
  });
}

export type TRPCRouter = typeof appRouter;
export function createTRPCCaller(
  props: Parameters<typeof createContextRaw>[0],
) {
  return createCallerFactory(appRouter)(createContextRaw(props));
}

export type TRPCInput = inferRouterInputs<TRPCRouter>;
export type TRPCOutput = inferRouterOutputs<TRPCRouter>;
