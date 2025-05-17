import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

import { dbConfig } from './db';

const nodeEnvSchema = z.enum(['development', 'production']);

export const envServer = createEnv({
  server: {
    ...dbConfig,

    NODE_ENV: nodeEnvSchema,

    CORS_ORIGINS: z
      .string()
      .optional()
      .transform((s) =>
        s == undefined
          ? ['http://localhost:5173', 'http://localhost:4173']
          : s.split(' '),
      )
      .refine((a) => z.array(z.url()).safeParse(a)),

    INVITATION_CODE: z.string(),
    AUTH_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
