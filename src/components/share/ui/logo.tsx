import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Logo = ({ ...rest }: LogoProps) => {
  return (
    <img
      src="/landing/plek_logo.svg"
      alt="Plek logo"
      {...rest}
      className={twMerge('h-6 invert brightness-0', rest.className)}
      style={{ filter: 'invert(1) brightness(100)' }}
    />
  );
};
