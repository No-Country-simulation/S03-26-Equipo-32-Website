import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type LabelProps = ComponentProps<'label'>;

export const Label = ({ className, ...rest }: LabelProps) => {
  return (
    <label
      className={twMerge(
        'text-sm font-dm-sans text-black font-semibold',
        className,
      )}
      {...rest}
    />
  );
};
