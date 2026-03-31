import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'>;

export const Checkbox = ({ className, ...rest }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={twMerge(
        "w-5 h-4 cursor-pointer appearance-none rounded border border-gray-300 bg-transparent checked:border-[#2D5016] checked:bg-[#2D5016] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat",
        className,
      )}
      {...rest}
    />
  );
};
