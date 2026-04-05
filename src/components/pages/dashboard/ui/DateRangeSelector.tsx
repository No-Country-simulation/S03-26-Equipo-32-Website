import { useEffect, useRef, useState } from 'react';
import {
  DATE_RANGE_LABELS,
  DATE_RANGE_PRESETS,
  matchPreset,
  type DateRangePreset,
} from '@/components/pages/dashboard/lib/dateRangePresets.ts';
import { Calendar, ChevronDown } from 'lucide-react';

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (preset: DateRangePreset) => {
    onSelect(preset);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 text-sm font-dm-sans text-[#78716C] bg-[#F6F3EF] cursor-pointer focus:outline-none focus:border-[#6B9E7A] select-none"
      >
        <Calendar size={14} className="text-[#78716C]" />
        <span>{active ? DATE_RANGE_LABELS[active] : 'Seleccionar'}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown — separated from trigger with margin */}
      {open && (
        <div className="absolute right-0 mt-2 min-w-40 rounded-xl border border-neutral-200 bg-[#FCF9F5] shadow-md z-50 overflow-hidden py-1 px-2">
          {DATE_RANGE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleSelect(preset)}
              className={`w-full text-left px-4 py-2 text-sm font-dm-sans cursor-pointer transition-colors ${
                preset === active
                  ? 'bg-[#6B9E7A] text-white rounded-lg'
                  : 'text-[#78716C]'
              }`}
            >
              {DATE_RANGE_LABELS[preset]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
