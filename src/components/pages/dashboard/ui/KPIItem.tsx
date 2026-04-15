import { TrendingUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface KPIItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: number;
  className?: string;
}

export const KPIItem = ({
  icon,
  value,
  label,
  trend,
  className,
}: KPIItemProps) => {
  return (
    <div className={twMerge('bg-white rounded-lg shadow p-4', className)}>
      <div className={'flex items-start justify-between mb-2'}>
        <div
          className={
            'bg-[#4C6548]/10 text-[#4C6548] rounded-md p-2 inline-flex items-center justify-center'
          }
        >
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={
              'text-xs font-dm-sans text-[#4A7C59] flex items-center gap-0.5'
            }
          >
            <TrendingUp size={12} />
            {trend}%
          </span>
        )}
      </div>
      <h3 className={'text-3xl font-medium text-[#162C14]'}>{value}</h3>
      <p className={'text-sm text-[#A8A29E]'}>{label}</p>
    </div>
  );
};
