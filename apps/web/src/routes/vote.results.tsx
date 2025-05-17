import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/vote/results')({
  component: RouteComponent,
});

function RouteComponent() {
  const countries = useQuery(trpc.countries.getAll.queryOptions());
  const votes = useQuery(
    trpc.votes.getOverallAll.queryOptions(void 0, { refetchInterval: 1000 }),
  );

  const countryVotes =
    countries.isSuccess && votes.isSuccess
      ? countries.data.map((country) => {
          const vote = votes.data.find((v) => v.countryId == country.id);
          return {
            ...country,
            vote: vote,
          };
        })
      : [];
  countryVotes.sort((a, b) => {
    if (b.vote == undefined && a.vote == undefined) {
      return a.number - b.number;
    }
    if (b.vote == undefined) {
      return -1;
    }
    if (a.vote == undefined) {
      return 1;
    }
    return b.vote.overall - a.vote.overall;
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to="/vote" className="flex gap-2 self-start">
        <ChevronLeftIcon />
        <p>Back</p>
      </Link>
      <p className="self-center text-2xl font-bold">Vote results</p>
      <div className="flex flex-col gap-2">
        {countryVotes.map((c) => (
          <div className="flex w-full p-2 px-6" key={c.id}>
            <p className="mr-2">{c.number}.</p>
            <img
              src={`https://flagcdn.com/${c.code}.svg`}
              width="30"
              alt={c.name}
            />
            <p className="ml-1">{c.name}</p>
            <div className="grow" />
            {!c.vote ? (
              <p className="ml-5 font-bold">No votes yet</p>
            ) : (
              <p className="ml-5 font-bold">{c.vote.overall}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
