import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLeads } from '@/components/features/leads/model/useLeads.ts';
import {
  DATE_RANGE_LABELS,
  DATE_RANGE_PRESETS,
  matchPreset,
  type DateRangePreset,
} from '@/components/pages/dashboard/lib/dateRangePresets.ts';
import type { StatisticsRange } from '@/core/statistics/entities/statistics.entity.ts';
import { FOUND_US } from '@/components/share/constants.ts';

const monthLabels = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

const businessOrder = [
  { key: 'BOUTIQUE', label: 'BOUTIQUE/TIENDA DE ACCESORIOS' },
  { key: 'STORE_GIFTS', label: 'TIENDA DE REGALOS' },
  { key: 'WHOLESALER', label: 'DISTRIBUIDOR' },
  { key: 'STORE_CORPORATE_GIFT', label: 'REGALOS CORPORATIVOS' },
  { key: 'OTHER', label: 'OTRO' },
] as const;

const channelPalette = [
  { label: 'Instagram', color: '#2D5A3D' },
  { label: 'SAPICA', color: '#4A7C59' },
  { label: 'Google', color: '#7CA688' },
  { label: 'Otro', color: '#B8D4BE' },
] as const;

type BusinessKey = (typeof businessOrder)[number]['key'];

export type LeadsVisitPoint = {
  date: string;
  value: number;
};

export type LeadsBusinessItem = {
  label: string;
  percent: number;
};

export type LeadsChannelItem = {
  label: string;
  value: number;
  color: string;
};

export type LeadsRangeOption = {
  key: DateRangePreset;
  label: string;
  active: boolean;
};

export type LeadsDashboardViewModel = {
  visitsTotal: number;
  visitsSeries: LeadsVisitPoint[];
  visitsXTicks: string[];
  visitsYTicks: number[];
  formatDate: (value: string) => string;
  rangeLabel: string;
  rangeOptions: LeadsRangeOption[];
  menuOpen: boolean;
  menuRef: RefObject<HTMLDivElement>;
  onToggleMenu: () => void;
  onSelectRange: (preset: DateRangePreset) => void;
  businessData: LeadsBusinessItem[];
  channels: LeadsChannelItem[];
  activeSlice: number | null;
  onSliceEnter: (index: number) => void;
  onSliceLeave: () => void;
};

export type UseLeadsDashboardArgs = {
  from: string;
  to: string;
  stats: StatisticsRange;
  onSelectPreset: (preset: DateRangePreset) => void;
};

const formatShortDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  const label = monthLabels[month - 1] ?? '';
  return `${label} ${day}`;
};

const buildTickValues = (dates: string[], count: number) => {
  if (dates.length <= count) return dates;
  const step = (dates.length - 1) / (count - 1);
  const ticks: string[] = [];
  let lastIndex = -1;

  for (let i = 0; i < count; i += 1) {
    let index = Math.round(i * step);
    if (index <= lastIndex) index = Math.min(dates.length - 1, lastIndex + 1);
    ticks.push(dates[index]);
    lastIndex = index;
  }

  return ticks;
};

const buildGridValues = (maxValue: number) => {
  const raw = [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];
  return raw.map((value, index) =>
    index === 0 || index === raw.length - 1
      ? Math.round(value)
      : Math.round(value / 5) * 5,
  );
};

export const useLeadsDashboard = ({
  from,
  to,
  stats,
  onSelectPreset,
}: UseLeadsDashboardArgs): LeadsDashboardViewModel => {
  const leadFilter = useMemo(() => ({ from, to }), [from, to]);
  const { leads } = useLeads(leadFilter);
  const currentPreset = matchPreset(from, to);

  const rangeLabel = currentPreset
    ? DATE_RANGE_LABELS[currentPreset]
    : 'Seleccionar';
  const rangeOptions = useMemo(
    () =>
      DATE_RANGE_PRESETS.map((preset) => ({
        key: preset,
        label: DATE_RANGE_LABELS[preset],
        active: preset === currentPreset,
      })),
    [currentPreset],
  );

  const visitsSeries = useMemo(() => {
    if (stats.byDay.length === 0) {
      return [{ date: from, value: 0 }];
    }
    return stats.byDay.map((day) => ({
      date: day.date,
      value: day.pageViews,
    }));
  }, [stats.byDay, from]);

  const maxVisitValue = Math.max(1, ...visitsSeries.map((item) => item.value));
  const maxValue = Math.ceil(maxVisitValue / 10) * 10;
  const visitsYTicks = buildGridValues(maxValue);
  const visitsXTicks = buildTickValues(
    visitsSeries.map((item) => item.date),
    4,
  );

  const businessData = useMemo(() => {
    const counts = businessOrder.reduce(
      (acc, item) => {
        acc[item.key] = 0;
        return acc;
      },
      {} as Record<BusinessKey, number>,
    );

    leads.forEach((lead) => {
      const key =
        (lead.businessType as BusinessKey) in counts
          ? (lead.businessType as BusinessKey)
          : 'OTHER';
      counts[key] += 1;
    });

    const total = leads.length;

    return businessOrder.map((item) => {
      const value = counts[item.key];
      const percent = total > 0 ? Math.round((value / total) * 100) : 0;
      return { label: item.label, percent };
    });
  }, [leads]);

  const channels = useMemo<LeadsChannelItem[]>(() => {
    const counts: Record<string, number> = {
      Instagram: 0,
      SAPICA: 0,
      Google: 0,
      Otro: 0,
    };

    leads.forEach((lead) => {
      const label = FOUND_US[lead.foundUs as keyof typeof FOUND_US] ?? 'Otro';
      if (label === 'Instagram') counts.Instagram += 1;
      else if (label === 'SAPICA') counts.SAPICA += 1;
      else if (label === 'Google') counts.Google += 1;
      else counts.Otro += 1;
    });

    return channelPalette.map((item) => ({
      label: item.label,
      color: item.color,
      value: counts[item.label] ?? 0,
    }));
  }, [leads]);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuOpen || !menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const onToggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const onSelectRange = useCallback(
    (preset: DateRangePreset) => {
      onSelectPreset(preset);
      setMenuOpen(false);
    },
    [onSelectPreset],
  );

  const [activeSlice, setActiveSlice] = useState<number | null>(null);
  const onSliceEnter = useCallback((index: number) => {
    setActiveSlice(index);
  }, []);
  const onSliceLeave = useCallback(() => {
    setActiveSlice(null);
  }, []);

  return {
    visitsTotal: stats.totals.pageViews,
    visitsSeries,
    visitsXTicks,
    visitsYTicks,
    formatDate: formatShortDate,
    rangeLabel,
    rangeOptions,
    menuOpen,
    menuRef,
    onToggleMenu,
    onSelectRange,
    businessData,
    channels,
    activeSlice,
    onSliceEnter,
    onSliceLeave,
  };
};
