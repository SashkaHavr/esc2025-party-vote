import { createFileRoute, Link, redirect } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';

import { EuroviosionLogo } from '~/components/icons';
import { trpcClient } from '~/lib/trpc';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    if (await trpcClient.user.get.query()) {
      throw redirect({ to: '/vote' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center gap-4 pb-40">
      <p className="text-2xl font-bold">Welcome to</p>
      <p className="text-2xl font-bold">Shisha & Chill 💨🍹</p>
      <p className="text-2xl font-bold">Voting For</p>
      <EuroviosionLogo className="h-40 p-4"></EuroviosionLogo>
      <Button asChild size="lg" className="w-32">
        <Link to="/login">Let's go!</Link>
      </Button>
    </div>
  );
}
