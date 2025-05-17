import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

export const dbConfig = {
  DATABASE_FILE_NAME: z.string().default('votes.sqlite'),
};

export const envDB = createEnv({
  server: { ...dbConfig },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
