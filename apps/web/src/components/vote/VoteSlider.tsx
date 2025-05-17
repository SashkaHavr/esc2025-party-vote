import { Slider } from '../ui/slider';

interface Props {
  heading: string;
  value: number;
  onValueChange: (value: number) => void;
}

export function VoteSlider({ heading, value, onValueChange }: Props) {
  return (
    <div className="flex w-90 flex-col">
      <p className="text-muted-foreground">{heading}</p>
      <div className="flex items-end gap-4">
        <Slider
          value={[value]}
          onValueChange={(e) => (e[0] != null ? onValueChange(e[0]) : 0)}
          defaultValue={[6]}
          min={0}
          max={12}
          className="w-80"
        />
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
