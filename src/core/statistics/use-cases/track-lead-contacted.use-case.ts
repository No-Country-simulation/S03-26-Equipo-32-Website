import type { StatisticsRepository } from '@/core/statistics/repositories/statistics.repository.ts';

export class TrackLeadContactedUseCase {
  private statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository;
  }

  execute() {
    return this.statisticsRepository.increment('contacted');
  }
}
