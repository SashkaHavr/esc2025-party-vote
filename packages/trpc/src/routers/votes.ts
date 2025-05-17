import { avg, eq } from 'drizzle-orm';
import z from 'zod/v4';

import { db } from '@esc-party-vote/db';
import { vote } from '@esc-party-vote/db/schema';

import { protectedProcedure, router } from '#init.ts';

function roundTo2(num: number) {
  if (num == 0) {
    return 0;
  }
  return Math.round(num * 100) / 100;
}

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
        voice: votes[0].voice ? roundTo2(Number.parseFloat(votes[0].voice)) : 0,
        performance: votes[0].performance
          ? roundTo2(Number.parseFloat(votes[0].performance))
          : 0,
        song: votes[0].song ? roundTo2(Number.parseFloat(votes[0].song)) : 0,
      };
      return {
        ...res,
        overall: roundTo2((res.song + res.performance + res.song) / 3),
      };
    }),
  getOverallAll: protectedProcedure.query(async () => {
    const votes = await db
      .select({
        countryId: vote.countryId,
        voice: avg(vote.voice),
        performance: avg(vote.performance),
        song: avg(vote.song),
      })
      .from(vote)
      .groupBy(vote.countryId);
    return votes.map((v) => {
      const res = {
        countryId: v.countryId,
        voice: v.voice ? roundTo2(Number.parseFloat(v.voice)) : 0,
        performance: v.performance
          ? roundTo2(Number.parseFloat(v.performance))
          : 0,
        song: v.song ? roundTo2(Number.parseFloat(v.song)) : 0,
      };
      return {
        ...res,
        overall: roundTo2((res.song + res.performance + res.song) / 3),
      };
    });
  }),
});
