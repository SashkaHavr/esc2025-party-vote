import type { TRPCOutput } from '@esc-party-vote/trpc';

interface Props {
  heading: string;
  vote: TRPCOutput['votes']['getOverall'];
}

export function VoteScores({ heading, vote }: Props) {
  return (
    <div className="flex w-60 flex-col gap-2">
      <p className="text-xl font-bold">{heading}</p>
      <div className="gap- flex flex-col gap-1">
        <div className="flex gap-4">
          <p className="font-bold">Song:</p>
          <p className="">{vote.song}</p>
        </div>
        <div className="flex gap-4">
          <p className="font-bold">Voice:</p>
          <p className="">{vote.voice}</p>
        </div>
        <div className="flex gap-4">
          <p className="font-bold">Performance:</p>
          <p className="">{vote.performance}</p>
        </div>
        <div className="flex gap-4">
          <p className="font-bold">Overall:</p>
          <p className="">{vote.overall}</p>
        </div>
      </div>
    </div>
  );
}
