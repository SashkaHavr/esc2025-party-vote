import z from 'zod/v4';

export const cookieSchema = z.object({ userId: z.number(), user: z.string() });
