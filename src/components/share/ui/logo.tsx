import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  variant?: 'light' | 'brand';
};

export const Logo = ({ variant = 'light', ...rest }: LogoProps) => {
  const isLight = variant === 'light';

  return (
    <img
      src="/landing/plek_logo.svg"
      alt="Plek logo"
      {...rest}
      className={twMerge(
        isLight ? 'h-6 invert brightness-0' : 'h-6',
        rest.className,
      )}
      style={{
        ...(isLight ? { filter: 'invert(1) brightness(100)' } : {}),
        ...rest.style,
      }}
    />
  );
};
