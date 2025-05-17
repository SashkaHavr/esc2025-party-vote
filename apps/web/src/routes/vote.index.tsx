import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/vote/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center gap-4 pb-40">
      <Button asChild className="w-32">
        <Link to="/vote/vote">Vote!</Link>
      </Button>
      <Button asChild className="w-32">
        <Link to="/vote/results">See results!</Link>
      </Button>
    </div>
  );
}
