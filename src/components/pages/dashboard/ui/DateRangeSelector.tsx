import {
  DATE_RANGE_LABELS,
  DATE_RANGE_PRESETS,
  matchPreset,
  type DateRangePreset,
} from '@/components/pages/dashboard/lib/dateRangePresets.ts';

interface DateRangeSelectorProps {
  from: string;
  to: string;
  onSelect: (preset: DateRangePreset) => void;
}

export const DateRangeSelector = ({
  from,
  to,
  onSelect,
}: DateRangeSelectorProps) => {
  const active = matchPreset(from, to);

  return (
    <select
      value={active ?? ''}
      onChange={(e) => onSelect(e.target.value as DateRangePreset)}
      className={
        'px-3 py-1.5 rounded-md border border-neutral-200 text-sm font-dm-sans text-[#78716C] bg-white cursor-pointer focus:outline-none focus:border-[#2D5A3D]'
      }
    >
      {DATE_RANGE_PRESETS.map((preset) => (
        <option key={preset} value={preset}>
          {DATE_RANGE_LABELS[preset]}
        </option>
      ))}
    </select>
  );
};
