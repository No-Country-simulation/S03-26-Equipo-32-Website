import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  label: string;
  options: readonly Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function CustomSelect({
  label,
  options,
  value,
  onChange,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const isActive = !!selected && selected.value !== options[0]?.value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={twMerge('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-dm-sans transition-colors cursor-pointer focus:outline-none select-none',
          isActive
            ? 'bg-[#6B9E7A] text-white hover:bg-[#5a8a68]'
            : 'bg-[#F6F3EF] text-black hover:bg-[#EDE9E3]',
        )}
      >
        <span>{isActive ? selected!.label : label}</span>
        <ChevronDown
          size={14}
          className={twMerge(
            'shrink-0 transition-transform duration-200',
            open && 'rotate-180',
            isActive ? 'text-white' : 'text-[#78716C]',
          )}
        />
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 min-w-40 rounded-xl border border-neutral-200 bg-[#FCF9F5] shadow-md z-50 overflow-hidden py-2 px-2">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                  className={twMerge(
                    'w-full text-left px-4 py-2 text-sm font-dm-sans cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-[#6B9E7A] text-white rounded-lg'
                      : 'text-[#78716C]',
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
