import { twMerge } from 'tailwind-merge';
import { ChevronDown, Calendar } from 'lucide-react';
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
import { FilterBottomSheet } from '@/components/pages/leads-manager/ui/FilterBottomSheet.tsx';
import { useModal } from '@/context/ModalContext.tsx';
import {
  DATE_RANGE_LABELS,
  DATE_RANGE_PRESETS,
  matchPreset,
  type DateRangePreset,
} from '@/components/pages/dashboard/lib/dateRangePresets.ts';

const getLabel = (
  options: readonly { value: string; label: string }[],
  value: string,
  defaultLabel: string,
): string => {
  if (value === 'todos') return defaultLabel;
  return options.find((o) => o.value === value)?.label ?? defaultLabel;
};

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const FilterChip = ({ label, active, onClick, icon }: ChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition-colors whitespace-nowrap shrink-0',
      active
        ? 'bg-[#6B9E7A] text-white border-[#6B9E7A]'
        : 'bg-white text-[#162C14] border-[#D1CFC9]',
    )}
  >
    {icon}
    {label}
    <ChevronDown
      size={14}
      className={active ? 'text-white' : 'text-[#78716C]'}
    />
  </button>
);

export const LeadsManagerFilters = () => {
  const [priority, setPriority] = usePriorityFilter();
  const [urgency, setUrgency] = useUrgencyFilter();
  const [status, setStatus] = useStatusFilter();
  const { from, to, setPreset } = useDashboardFilter();
  const modal = useModal();

  const activePreset = matchPreset(from, to);

  const openFilter = (
    title: string,
    options: readonly { value: string; label: string }[],
    value: string,
    onChange: (v: string) => void,
  ) => {
    modal.open({
      render: (
        <FilterBottomSheet
          title={title}
          options={options}
          value={value}
          onChange={onChange}
        />
      ),
      variant: 'sheet-bottom',
      showCloseButton: false,
    });
  };

  const openDateFilter = () => {
    const dateOptions = DATE_RANGE_PRESETS.map((p) => ({
      value: p,
      label: DATE_RANGE_LABELS[p],
    }));
    modal.open({
      render: (
        <FilterBottomSheet
          title="Período"
          options={dateOptions}
          value={activePreset ?? ''}
          onChange={(v) => setPreset(v as DateRangePreset)}
        />
      ),
      variant: 'sheet-bottom',
      showCloseButton: false,
    });
  };

  return (
    <>
      {/* ── Mobile: chips que abren bottom sheet ── */}
      <div className="sm:hidden flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        <FilterChip
          label={getLabel(PRIORITY_OPTIONS, priority, 'Prioridad')}
          active={priority !== 'todos'}
          onClick={() =>
            openFilter('Prioridad', PRIORITY_OPTIONS, priority, setPriority)
          }
        />
        <FilterChip
          label={getLabel(URGENCY_OPTIONS, urgency, 'Urgencia')}
          active={urgency !== 'todos'}
          onClick={() =>
            openFilter('Urgencia', URGENCY_OPTIONS, urgency, setUrgency)
          }
        />
        <FilterChip
          label={getLabel(STATUS_OPTIONS, status, 'Estado')}
          active={status !== 'todos'}
          onClick={() =>
            openFilter('Estado', STATUS_OPTIONS, status, setStatus)
          }
        />
        <FilterChip
          label={activePreset ? DATE_RANGE_LABELS[activePreset] : 'Período'}
          active={!!activePreset}
          icon={<Calendar size={14} />}
          onClick={openDateFilter}
        />
      </div>

      {/* ── Desktop: selects normales ── */}
      <div className="hidden sm:flex gap-4 mb-4 flex-wrap">
        <CustomSelect
          className={'w-fit font-dm-sans'}
          label={'Prioridad'}
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={setPriority}
        />

        <CustomSelect
          className={'w-fit font-dm-sans'}
          label={'Urgencia'}
          options={URGENCY_OPTIONS}
          value={urgency}
          onChange={setUrgency}
        />

        <CustomSelect
          className={'w-fit font-dm-sans'}
          label={'Estado'}
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />

        <DateRangeSelector from={from} to={to} onSelect={setPreset} />
      </div>
    </>
  );
};
