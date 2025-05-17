import { integer, pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: integer(),
});
