import type { StatisticsRepository } from '@/core/statistics/repositories/statistics.repository.ts';

export class TrackCatalogDownloadUseCase {
  private statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository;
  }

  execute() {
    return this.statisticsRepository.increment('catalogDownloads');
  }
}
