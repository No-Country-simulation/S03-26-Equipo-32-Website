import { twMerge } from 'tailwind-merge';
import * as React from 'react';

interface FunnelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor: string;
  total: number;
  label: string;
  percentage: number;
  totalColor?: string;
  labelColor?: string;
  percentageColor?: string;
}

export const FunnelCard = ({
  bgColor,
  label,
  percentage,
  total,
  totalColor,
  labelColor,
  percentageColor,
  ...rest
}: FunnelCardProps) => {
  const formatted = total.toLocaleString('en-US');

  return (
    <div
      {...rest}
      style={{ backgroundColor: bgColor, ...rest.style }}
      className={twMerge('font-dm-sans p-4 rounded-xl', rest.className)}
    >
      <div
        className={'text-3xl font-bold'}
        style={{ color: totalColor ?? 'white' }}
      >
        {formatted}
      </div>
      <div className={'text-sm'} style={{ color: labelColor ?? 'white' }}>
        {label}
      </div>
      <div
        className={'text-xs mt-auto uppercase'}
        style={{ color: percentageColor ?? 'rgba(255,255,255,0.5)' }}
      >
        {percentage}% del total
      </div>
    </div>
  );
};
