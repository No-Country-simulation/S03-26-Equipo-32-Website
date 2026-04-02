import { EMPTY_TOTALS } from '@/core/database/repositories/statistics.repository.ts';
import { useEffect, useState } from 'react';
import { statisticsContainer } from '@/core/containers/statistics.container.ts';
import type { StatisticsRange } from '@/core/statistics/entities/statistics.entity.ts';

const INITIAL_STATE: StatisticsRange = {
  totals: { ...EMPTY_TOTALS },
  byDay: [],
};

export const useStats = () => {
  const [stats, setStats] = useState<StatisticsRange>(INITIAL_STATE);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const isoToday = `${yyyy}-${mm}-${dd}`;

    statisticsContainer.getStatisticsRange
      .execute(isoToday, isoToday)
      .then((res) => {
        setStats(res);
      });
  }, []);

  return { stats };
};
