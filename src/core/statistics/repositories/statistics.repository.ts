export interface StatisticsRepository {
  increment(
    field: 'pageViews' | 'formInteractions' | 'catalogDownloads',
  ): Promise<void>;
}
