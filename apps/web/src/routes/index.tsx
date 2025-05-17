import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const health = useQuery(trpc.health.queryOptions());

  return (
    <div className="flex flex-col gap-10">
      <p>Hello "/"!</p>
      <p className="font-bold text-green-500">{health.data}</p>
    </div>
  );
}
