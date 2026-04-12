import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type WhatsAppIconProps = React.HTMLAttributes<HTMLSpanElement>;

export const WhatsAppIcon = ({
  className,
  style,
  ...rest
}: WhatsAppIconProps) => (
  <span
    className={twMerge('inline-block align-middle bg-current', className)}
    style={{
      WebkitMaskImage: "url('/landing/whatsapp.svg')",
      maskImage: "url('/landing/whatsapp.svg')",
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: '145% 145%',
      maskSize: '145% 145%',
      ...style,
    }}
    {...rest}
  />
);
