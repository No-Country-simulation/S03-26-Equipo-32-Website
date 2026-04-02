import { parseAsString, useQueryState } from 'nuqs';
import moment from 'moment';
import {
  getDateRange,
  type DateRangePreset,
} from '@/components/pages/dashboard/lib/dateRangePresets.ts';

const todayIso = () => moment().format('YYYY-MM-DD');
const last30DaysIso = () => moment().subtract(29, 'days').format('YYYY-MM-DD');

export const useDashboardFilter = () => {
  const [from, setFrom] = useQueryState(
    'from',
    parseAsString.withDefault(last30DaysIso()),
  );
  const [to, setTo] = useQueryState(
    'to',
    parseAsString.withDefault(todayIso()),
  );

  const setPreset = (preset: DateRangePreset) => {
    const range = getDateRange(preset);
    setFrom(range.from);
    setTo(range.to);
  };

  return { from, to, setPreset };
};
