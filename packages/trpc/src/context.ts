import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { SerializeOptions } from 'cookie';
import type { Context as HonoContext } from 'hono';
import cookie from 'cookie';

export function createContextRaw({
  request,
  c,
  opts,
}: {
  request: Request;
  c: HonoContext;
  opts: FetchCreateContextFnOptions;
}) {
  const getCookie = (name: string) => {
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) return;
    const cookies = cookie.parse(cookieHeader);
    return cookies[name];
  };

  const setCookie = (
    name: string,
    value: string,
    options?: SerializeOptions,
  ) => {
    opts.resHeaders.append(
      'Set-Cookie',
      cookie.serialize(name, value, options),
    );
  };

  return {
    request: request,
    c: c,
    opts: opts,
    getCookie,
    setCookie,
  };
}

export function createContext(
  opts: FetchCreateContextFnOptions,
  c: HonoContext,
) {
  return createContextRaw({ request: opts.req, c: c, opts: opts });
}

export type Context = Awaited<ReturnType<typeof createContext>>;
