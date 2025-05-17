import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center gap-4 pb-40">
      <Input type="text" placeholder="Invitation code" className="w-72" />
      <Input type="text" placeholder="Your name" className="w-72" />
      <Button asChild size="lg">
        <Link to="/">Enter voting room</Link>
      </Button>
    </div>
  );
}
