import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { useModal } from '@/context/ModalContext.tsx';

interface Option {
  value: string;
  label: string;
}

interface FilterBottomSheetProps {
  title: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
}

export const FilterBottomSheet = ({
  title,
  options,
  value,
  onChange,
}: FilterBottomSheetProps) => {
  const modal = useModal();

  return (
    <div className="font-dm-sans pb-safe">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <h3 className="text-base font-semibold text-[#162C14]">{title}</h3>
        <button
          onClick={modal.close}
          className="text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 py-3 space-y-1">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                modal.close();
              }}
              className={twMerge(
                'w-full text-left px-4 py-3 rounded-xl text-sm transition-colors',
                isSelected
                  ? 'bg-[#6B9E7A] text-white font-medium'
                  : 'text-[#162C14] hover:bg-[#F6F3EF]',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
