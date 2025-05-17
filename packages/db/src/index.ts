import { drizzle } from 'drizzle-orm/node-postgres';

import { envServer } from '@esc-party-vote/env/server';

import { relations } from '#relations.ts';
import * as schema from './schema';

export const db = drizzle({
  connection: {
    connectionString: envServer.DATABASE_URL,
    ssl: envServer.DATABASE_SSL,
  },
  schema: schema,
  relations: relations,
  casing: 'snake_case',
});
