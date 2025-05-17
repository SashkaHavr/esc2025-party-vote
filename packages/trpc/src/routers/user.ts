import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';

import { db } from '@esc-party-vote/db';
import { user as userTable } from '@esc-party-vote/db/schema';
import { envServer } from '@esc-party-vote/env/server';

import { publicProcedure, router } from '#init.ts';

const cookieSchema = z.object({ userId: z.number(), user: z.string() });

export const userRouter = router({
  login: publicProcedure
    .input(z.object({ invitationCode: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.invitationCode != envServer.INVITATION_CODE) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "Access code doesn't match",
        });
      }
      let user = await db.query.user.findFirst({
        where: { name: input.name },
      });
      user ??= (
        await db.insert(userTable).values({ name: input.name }).returning()
      )[0];
      if (user) {
        ctx.setCookie(
          'auth',
          JSON.stringify({ user: user.name, userId: user.id } satisfies z.infer<
            typeof cookieSchema
          >),
          {
            maxAge: 14 * 24 * 60 * 60,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
          },
        );
      }
    }),
  get: publicProcedure.output(cookieSchema.optional()).query(({ ctx }) => {
    const cookie = ctx.getCookie('auth');
    if (cookie == undefined) {
      return undefined;
    }
    return cookieSchema.parse(JSON.parse(cookie));
  }),
});
