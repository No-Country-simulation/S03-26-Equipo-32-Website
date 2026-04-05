import { CustomSelect } from '@/components/share/ui/CustomSelect.tsx';
import { DateRangeSelector } from '@/components/pages/dashboard/ui/DateRangeSelector.tsx';
import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { usePriorityFilter } from '@/components/pages/leads-manager/model/usePriorityFilter.ts';
import { useUrgencyFilter } from '@/components/pages/leads-manager/model/useUrgencyFilter.ts';
import { useStatusFilter } from '@/components/pages/leads-manager/model/useStatusFilter.ts';

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
        options={[
          {
            value: 'todos',
            label: 'Todos',
          },
          {
            value: 'alta',
            label: 'Alta prioridad',
          },
          {
            value: 'media',
            label: 'Potencial medio',
          },
          {
            value: 'baja',
            label: 'Bajo potencial',
          },
        ]}
        value={priority}
        onChange={setPriority}
      />

      <CustomSelect
        className={'w-fit'}
        label={'Urgencia'}
        options={[
          {
            value: 'todos',
            label: 'Todos',
          },
          {
            value: 'urgente',
            label: 'Urgente',
          },
          {
            value: 'no-urgente',
            label: 'No urgente',
          },
        ]}
        value={urgency}
        onChange={setUrgency}
      />

      <CustomSelect
        className={'w-fit'}
        label={'Estado'}
        options={[
          {
            value: 'todos',
            label: 'Todos',
          },
          {
            value: 'en-espera',
            label: 'En espera',
          },
          {
            value: 'contactado',
            label: 'Contactado',
          },
        ]}
        value={status}
        onChange={setStatus}
      />

      <DateRangeSelector from={from} to={to} onSelect={setPreset} />
    </div>
  );
};
