export interface Statistics {
  id: string;
  timestamp: number;
  pageViews: number;
  formInteractions: number;
  catalogDownloads: number;
  totalLeads: number;
  contacted: number;
}

export interface StatisticsRange {
  totals: Omit<Statistics, 'id' | 'timestamp'>;
  byDay: Array<{ date: string } & Omit<Statistics, 'id' | 'timestamp'>>;
}
