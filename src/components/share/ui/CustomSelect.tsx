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
  placeholder = 'Seleccionar',
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

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
    <div ref={ref} className={twMerge('relative w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg bg-[#F6F3EF] px-4 py-2 text-sm text-[#2D2D2D] transition-colors hover:bg-[#EDE9E3] gap-3"
      >
        <span className="font-light text-[#A8A29E] uppercase text-xs">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span className={selected ? 'text-[#162C14]' : 'text-[#2D2D2D]/40'}>
            {selected ? selected.label : placeholder}
          </span>

          <ChevronDown
            className={twMerge(
              'h-4 w-4 shrink-0 text-[#2D2D2D] transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </div>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 min-w-40 rounded-xl border border-neutral-200 bg-[#FCF9F5] shadow-md z-50 overflow-hidden py-1 px-2">
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
