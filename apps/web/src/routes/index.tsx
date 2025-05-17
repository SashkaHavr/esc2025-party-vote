import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';

import { EuroviosionLogo } from '~/components/icons';
import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const health = useQuery(trpc.health.queryOptions());
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center gap-4 pb-40">
      <p className="font-bold">{health.data}</p>
      <p className="text-2xl font-bold">Welcome to</p>
      <p className="text-2xl font-bold">Shisha & Chill 💨🍹</p>
      <p className="text-2xl font-bold">Voting For</p>
      <EuroviosionLogo className="h-40 p-4"></EuroviosionLogo>
      <Button asChild size="lg">
        <Link to="/login" className="text-xl">
          Let's go!
        </Link>
      </Button>
    </div>
  );
}
