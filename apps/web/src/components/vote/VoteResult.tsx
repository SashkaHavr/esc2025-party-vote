interface Props {
  heading: string;
  value: number | undefined;
}

export function VoteResult({ heading, value }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold">{heading}</p>
      <p className="">{value ?? 0}</p>
    </div>
  );
}
