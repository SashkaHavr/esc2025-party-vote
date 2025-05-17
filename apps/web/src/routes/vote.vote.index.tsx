import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/vote/vote/')({
  component: RouteComponent,
});

function RouteComponent() {
  const countries = useQuery(trpc.countries.getAll.queryOptions());

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to="/vote" className="flex gap-2">
        <ChevronLeftIcon />
        <p>Back</p>
      </Link>
      <p className="self-center text-2xl font-bold">Choose country</p>
      <div className="flex flex-col gap-2">
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
                  <p className="mr-2">{c.number}.</p>
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
