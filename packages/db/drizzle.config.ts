import { defineConfig } from 'drizzle-kit';

import { envDB } from '@esc-party-vote/env/db';

export default defineConfig({
  out: './drizzle',
  schema: './src/schema',
  dialect: 'sqlite',
  dbCredentials: { url: envDB.DATABASE_FILE_NAME },
  casing: 'snake_case',
});
