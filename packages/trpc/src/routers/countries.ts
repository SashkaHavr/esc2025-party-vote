import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';

import { db } from '@esc-party-vote/db';

import { protectedProcedure, router } from '#init.ts';

export const countriesRouter = router({
  getAll: protectedProcedure.query(() => db.query.country.findMany()),
  get: protectedProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const country = await db.query.country.findFirst({
        where: { code: input.code },
      });
      if (!country) throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT' });
      return country;
    }),
});
