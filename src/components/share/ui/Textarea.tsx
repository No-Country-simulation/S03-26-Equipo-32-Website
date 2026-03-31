import { type ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaProps = ComponentProps<'textarea'>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
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
