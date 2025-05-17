import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';

import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/vote/vote/')({
  component: RouteComponent,
});

function RouteComponent() {
  const countries = useQuery(trpc.countries.getAll.queryOptions());

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 p-4">
        {countries.isSuccess &&
          countries.data.map((c) => (
            <Button
              asChild
              variant="ghost"
              key={c.code}
              className="justify-start"
            >
              <Link
                to="/vote/vote/$countryCode"
                params={{ countryCode: c.code }}
              >
                <div className="flex">
                  <p className="mr-1">{c.number}.</p>
                  <img
                    src={`https://flagcdn.com/${c.code}.svg`}
                    width="30"
                    alt={c.name}
                  />
                  <p className="ml-1">{c.name}</p>
                </div>
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
