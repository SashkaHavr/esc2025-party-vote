import { useState } from 'react';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { VoteScores } from '~/components/vote/VoteScores';
import { VoteSlider } from '~/components/vote/VoteSlider';
import { trpc } from '~/lib/trpc';

export const Route = createFileRoute('/vote/vote/$countryCode')({
  component: RouteComponent,
});

function RouteComponent() {
  const { countryCode } = Route.useParams();
  const queryClient = useQueryClient();
  const country = useQuery(
    trpc.countries.get.queryOptions({ code: countryCode }),
  );
  const userVote = useQuery(
    trpc.votes.get.queryOptions(
      country.isSuccess ? { countryId: country.data.id } : skipToken,
    ),
  );

  const voteMutation = useMutation(
    trpc.votes.set.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.votes.get.queryKey(),
        });
        await queryClient.invalidateQueries({
          queryKey: trpc.votes.getOverall.queryKey(),
        });
        await queryClient.invalidateQueries({
          queryKey: trpc.votes.getOverallAll.queryKey(),
        });
      },
    }),
  );

  const votesOverall = useQuery(
    trpc.votes.getOverall.queryOptions(
      country.isSuccess ? { countryId: country.data.id } : skipToken,
      { refetchInterval: 1000 },
    ),
  );

  const nextCountry = useQuery(
    trpc.countries.getNext.queryOptions(
      country.isSuccess ? { countryNumber: country.data.number } : skipToken,
    ),
  );

  const [song, setSong] = useState(6);
  const [voice, setVoice] = useState(6);
  const [performance, setPerformance] = useState(6);
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <Link to="/vote/vote" className="flex gap-2 self-start">
        <ChevronLeftIcon />
        <p>All countries</p>
      </Link>
      {country.isSuccess && (
        <div className="flex gap-4">
          <p className="text-xl font-bold">Vote for {country.data.name}</p>
          <img
            src={`https://flagcdn.com/${country.data.code}.svg`}
            width="30"
            alt={country.data.name}
          />
        </div>
      )}
      {country.isSuccess &&
        userVote.isSuccess &&
        nextCountry.isSuccess &&
        (userVote.data.status == 'defined' && votesOverall.data ? (
          <div className="flex w-60 flex-col gap-6">
            <VoteScores heading="Average scores:" vote={votesOverall.data} />
            <VoteScores heading="Your scores:" vote={userVote.data} />
            {nextCountry.data.country && (
              <Button
                variant="secondary"
                asChild
                className="mt-10 min-w-40 self-center"
              >
                <Link
                  to="/vote/vote/$countryCode"
                  params={{ countryCode: nextCountry.data.country.code }}
                  className="flex gap-2 px-4"
                >
                  <p>Go to {nextCountry.data.country.name}</p>
                  <img
                    src={`https://flagcdn.com/${nextCountry.data.country.code}.svg`}
                    width="24"
                    alt={nextCountry.data.country.name}
                  />
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <>
            <VoteSlider heading="Song" value={song} onValueChange={setSong} />
            <VoteSlider
              heading="Voice"
              value={voice}
              onValueChange={setVoice}
            />
            <VoteSlider
              heading="Performance"
              value={performance}
              onValueChange={setPerformance}
            />
            <Button
              className="w-40"
              onClick={() =>
                voteMutation.mutate({
                  song: song,
                  voice: voice,
                  performance: performance,
                  countryId: country.data.id,
                })
              }
            >
              Submit
            </Button>
          </>
        ))}
    </div>
  );
}
