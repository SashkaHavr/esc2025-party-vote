import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { envServer } from '@esc-party-vote/env/server';
import { trpcHandler } from '@esc-party-vote/trpc';

const app = new Hono();

app.use(
  '/trpc/*',
  cors({
    origin: envServer.CORS_ORIGINS,
    maxAge: 600,
    credentials: true,
  }),
);

app.on(['POST', 'GET'], '/trpc/*', (c) => {
  return trpcHandler({ request: c.req.raw });
});

export default {
  port: 3000,
  fetch: app.fetch,
};
