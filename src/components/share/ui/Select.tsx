import { type ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = ComponentProps<'select'>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          'w-full appearance-none rounded-md border-none bg-white px-3 py-2 text-sm outline-none focus:ring-0 [&>option]:bg-white [&>option]:text-gray-900 [&>option:checked]:!bg-[#2D5016] [&>option:checked]:!text-white [&>option:hover]:!bg-[#2D5016] [&>option:hover]:!text-white',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    );
  },
);
