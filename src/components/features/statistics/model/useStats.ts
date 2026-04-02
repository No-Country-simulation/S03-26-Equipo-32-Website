import { EMPTY_TOTALS } from '@/core/database/repositories/statistics.repository.ts';
import { useEffect, useState } from 'react';
import { statisticsContainer } from '@/core/containers/statistics.container.ts';
import type { StatisticsRange } from '@/core/statistics/entities/statistics.entity.ts';

const INITIAL_STATE: StatisticsRange = {
  totals: { ...EMPTY_TOTALS },
  byDay: [],
};

export const useStats = (from: string, to: string) => {
  const [stats, setStats] = useState<StatisticsRange>(INITIAL_STATE);

  useEffect(() => {
    let cancelled = false;
    setStats(INITIAL_STATE);
    statisticsContainer.getStatisticsRange
      .execute(from, to)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        console.error('[useStats] getRange error:', err);
      });
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  return { stats };
};
