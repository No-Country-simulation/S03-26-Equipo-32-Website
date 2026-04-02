import moment from 'moment';

export type DateRangePreset =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'last90days';

export interface DateRange {
  from: string;
  to: string;
}

export const DATE_RANGE_LABELS: Record<DateRangePreset, string> = {
  today: 'Hoy',
  yesterday: 'Ayer',
  last7days: 'Últimos 7 días',
  last30days: 'Últimos 30 días',
  last90days: 'Últimos 90 días',
};

export const DATE_RANGE_PRESETS = Object.keys(
  DATE_RANGE_LABELS,
) as DateRangePreset[];

const fmt = 'YYYY-MM-DD';

export const getDateRange = (preset: DateRangePreset): DateRange => {
  const today = moment().format(fmt);
  switch (preset) {
    case 'today':
      return { from: today, to: today };
    case 'yesterday': {
      const yesterday = moment().subtract(1, 'day').format(fmt);
      return { from: yesterday, to: yesterday };
    }
    case 'last7days':
      return { from: moment().subtract(6, 'days').format(fmt), to: today };
    case 'last30days':
      return { from: moment().subtract(29, 'days').format(fmt), to: today };
    case 'last90days':
      return { from: moment().subtract(89, 'days').format(fmt), to: today };
  }
};

export const matchPreset = (
  from: string,
  to: string,
): DateRangePreset | null => {
  for (const preset of DATE_RANGE_PRESETS) {
    const range = getDateRange(preset);
    if (range.from === from && range.to === to) return preset;
  }
  return null;
};
