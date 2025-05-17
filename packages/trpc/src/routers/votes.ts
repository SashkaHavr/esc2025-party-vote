import { avg, eq } from 'drizzle-orm';
import z from 'zod/v4';

import { db } from '@esc-party-vote/db';
import { vote } from '@esc-party-vote/db/schema';

import { protectedProcedure, router } from '#init.ts';

export const votesRouter = router({
  set: protectedProcedure
    .input(
      z.object({
        song: z.number(),
        voice: z.number(),
        performance: z.number(),
        countryId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await db.insert(vote).values({ userId: ctx.user.userId, ...input });
    }),
  get: protectedProcedure
    .input(z.object({ countryId: z.number() }))
    .query(async ({ input, ctx }) => {
      const vote = await db.query.vote.findFirst({
        where: { userId: ctx.user.userId, countryId: input.countryId },
      });
      if (!vote) {
        return { status: 'undefined' as const };
      }
      return { status: 'defined' as const, ...vote };
    }),
  getOverall: protectedProcedure
    .input(z.object({ countryId: z.number() }))
    .query(async ({ input }) => {
      const votes = await db
        .select({
          countryId: vote.countryId,
          voice: avg(vote.voice),
          performance: avg(vote.performance),
          song: avg(vote.song),
        })
        .from(vote)
        .where(eq(vote.countryId, input.countryId))
        .groupBy(vote.countryId);
      if (votes[0] == undefined) {
        return { voice: 0, performance: 0, song: 0, overall: 0 };
      }
      const res = {
        voice: votes[0].voice ? Number.parseFloat(votes[0].voice) : 0,
        performance: votes[0].performance
          ? Number.parseFloat(votes[0].performance)
          : 0,
        song: votes[0].song ? Number.parseFloat(votes[0].song) : 0,
      };
      console.log(res);
      return { ...res, overall: (res.song + res.performance + res.song) / 3 };
    }),
});
