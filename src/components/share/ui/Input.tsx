import { type ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          'w-full rounded-md border-none bg-white px-3 py-2 text-sm outline-none focus:ring-0 placeholder:text-[#2D5016]/50',
          className,
        )}
        {...rest}
      />
    );
  },
);
