import type { StatisticsRange } from '@/core/statistics/entities/statistics.entity.ts';

export type StatisticsField =
  | 'pageViews'
  | 'formInteractions'
  | 'catalogDownloads'
  | 'totalLeads';

export interface StatisticsRepository {
  increment(field: StatisticsField): Promise<void>;
  getRange(from: string, to: string): Promise<StatisticsRange>;
}
