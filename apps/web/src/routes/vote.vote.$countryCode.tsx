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
      },
    }),
  );

  const votesOverall = useQuery(
    trpc.votes.getOverall.queryOptions(
      country.isSuccess ? { countryId: country.data.id } : skipToken,
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
        (userVote.data.status == 'defined' && votesOverall.data ? (
          <>
            <p className="text-xl font-bold">Average scores:</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <p className="font-bold">Song</p>
                <p className="">{votesOverall.data.song}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Voice</p>
                <p className="">{votesOverall.data.voice}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Performance</p>
                <p className="">{votesOverall.data.performance}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Overall</p>
                <p className="">{votesOverall.data.overall}</p>
              </div>
            </div>
          </>
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
