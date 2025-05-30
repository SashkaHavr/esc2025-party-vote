import { defineConfig } from 'drizzle-kit';

import { envDB } from '@esc-party-vote/env/db';

export default defineConfig({
  out: './drizzle',
  schema: './src/schema',
  dialect: 'postgresql',
  dbCredentials: { url: envDB.DATABASE_URL, ssl: envDB.DATABASE_SSL },
  casing: 'snake_case',
});
