import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { DateRangeSelector } from '@/components/pages/dashboard/ui/DateRangeSelector.tsx';
import { BellRing, Search } from 'lucide-react';

export const DashboardHeader = () => {
  const { from, to, setPreset } = useDashboardFilter();

  return (
    <div
      className={'flex flex-col md:flex-row md:items-center justify-between'}
    >
      <h1 className={'text-2xl font-semibold font-cormorant text-[#162C14]'}>
        Panel General
      </h1>

      <div className={'flex items-center gap-4 flex-wrap'}>
        <DateRangeSelector from={from} to={to} onSelect={setPreset} />

        <div
          className={
            'flex items-center gap-2 border-none rounded-full px-3 py-2 bg-white'
          }
        >
          <Search className={'size-3 text-gray-400 shrink-0'} />
          <input
            type={'text'}
            placeholder={'Buscar leads...'}
            className={
              'outline-none focus:outline-none bg-transparent placeholder:text-[#6B7280] placeholder:text-sm font-dm-sans text-sm'
            }
          />
        </div>

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
