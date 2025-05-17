import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { trpcClient } from '~/lib/trpc';

export const Route = createFileRoute('/vote')({
  beforeLoad: async () => {
    const user = await trpcClient.user.get.query();
    if (!user) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
