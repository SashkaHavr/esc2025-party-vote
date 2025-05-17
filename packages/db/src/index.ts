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

if ((await db.query.country.findFirst()) == undefined) {
  await db.insert(schema.country).values([
    { name: 'Norway', code: 'no', number: 1 },
    { name: 'Luxembourg ', code: 'lu', number: 2 },
    { name: 'Estonia ', code: 'ee', number: 3 },
    { name: 'Israel ', code: 'il', number: 4 },
    { name: 'Lithuania ', code: 'lt', number: 5 },
    { name: 'Spain ', code: 'es', number: 6 },
    { name: 'Ukraine ', code: 'ua', number: 7 },
    { name: 'United Kingdom', code: 'gb', number: 8 },
    { name: 'Austria', code: 'at', number: 9 },
    { name: 'Iceland', code: 'is', number: 10 },
    { name: 'Latvia', code: 'lv', number: 11 },
    { name: 'Netherlands', code: 'nl', number: 12 },
    { name: 'Finland', code: 'fi', number: 13 },
    { name: 'Italy', code: 'it', number: 14 },
    { name: 'Poland', code: 'pl', number: 15 },
    { name: 'Germany', code: 'de', number: 16 },
    { name: 'Greece', code: 'gr', number: 17 },
    { name: 'Armenia', code: 'am', number: 18 },
    { name: 'Switzerland', code: 'ch', number: 19 },
    { name: 'Malta', code: 'mt', number: 20 },
    { name: 'Portugal', code: 'pt', number: 21 },
    { name: 'Denmark', code: 'dk', number: 22 },
    { name: 'Sweden', code: 'se', number: 23 },
    { name: 'France', code: 'fr', number: 24 },
    { name: 'San Marino', code: 'sm', number: 25 },
    { name: 'Albania', code: 'al', number: 26 },
  ]);
}
console.log('COUNTRIES: ', (await db.query.country.findMany()).length);
