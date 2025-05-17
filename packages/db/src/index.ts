import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

import { envServer } from '@esc-party-vote/env/server';

import { relations } from '#relations.ts';
import * as schema from './schema';

const sqlite = new Database(envServer.DATABASE_FILE_NAME);
export const db = drizzle({
  client: sqlite,
  schema: schema,
  relations: relations,
  casing: 'snake_case',
});
