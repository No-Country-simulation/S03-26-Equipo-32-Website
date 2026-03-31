import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'>;

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={twMerge(
        'w-full rounded-md border-none bg-white px-3 py-2 text-sm outline-none focus:ring-0 placeholder:text-[#2D5016]/50',
        className,
      )}
      {...rest}
    />
  );
};
