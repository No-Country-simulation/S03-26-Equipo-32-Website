import { CustomSelect } from '@/components/share/ui/CustomSelect.tsx';
import { DateRangeSelector } from '@/components/pages/dashboard/ui/DateRangeSelector.tsx';
import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { usePriorityFilter } from '@/components/pages/leads-manager/model/usePriorityFilter.ts';
import { useUrgencyFilter } from '@/components/pages/leads-manager/model/useUrgencyFilter.ts';
import { useStatusFilter } from '@/components/pages/leads-manager/model/useStatusFilter.ts';
import {
  PRIORITY_OPTIONS,
  URGENCY_OPTIONS,
  STATUS_OPTIONS,
} from '@/components/pages/leads-manager/model/leadsFilterOptions.ts';

export const LeadsManagerFilters = () => {
  const [priority, setPriority] = usePriorityFilter();
  const [urgency, setUrgency] = useUrgencyFilter();
  const [status, setStatus] = useStatusFilter();
  const { from, to, setPreset } = useDashboardFilter();
  return (
    <div className={'flex gap-4 mb-4'}>
      <CustomSelect
        className={'w-fit'}
        label={'Prioridad'}
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={setPriority}
      />

      <CustomSelect
        className={'w-fit'}
        label={'Urgencia'}
        options={URGENCY_OPTIONS}
        value={urgency}
        onChange={setUrgency}
      />

      <CustomSelect
        className={'w-fit'}
        label={'Estado'}
        options={STATUS_OPTIONS}
        value={status}
        onChange={setStatus}
      />

      <DateRangeSelector from={from} to={to} onSelect={setPreset} />
    </div>
  );
};
