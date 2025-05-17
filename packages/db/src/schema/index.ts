import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text().notNull(),
});

export const country = pgTable('country', {
  id: serial('id').primaryKey(),
  name: text().notNull(),
  code: text().notNull(),
  number: integer().notNull(),
});

export const vote = pgTable('vote', {
  userId: integer()
    .notNull()
    .references(() => user.id),
  countryId: integer()
    .notNull()
    .references(() => country.id),
  song: integer().notNull(),
  voice: integer().notNull(),
  performance: integer().notNull(),
});
