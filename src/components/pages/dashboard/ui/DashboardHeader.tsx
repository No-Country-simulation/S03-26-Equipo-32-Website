import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { DateRangeSelector } from '@/components/pages/dashboard/ui/DateRangeSelector.tsx';
import { BellRing } from 'lucide-react';

export const DashboardHeader = () => {
  const { from, to, setPreset } = useDashboardFilter();

  return (
    <div className={'flex items-center justify-between'}>
      <h1 className={'text-2xl font-semibold font-cormorant text-[#162C14]'}>
        Panel General
      </h1>

      <div className={'flex items-center gap-4'}>
        <DateRangeSelector from={from} to={to} onSelect={setPreset} />

        <input
          type={'text'}
          placeholder={'Buscar leads...'}
          className={'border rounded px-2 py-1'}
        />

        <div
          className={
            'p-2 rounded-full hover:bg-white cursor-pointer hover:shadow-xs'
          }
        >
          <BellRing className={'size-4 text-gray-600'} />
        </div>
      </div>
    </div>
  );
};
