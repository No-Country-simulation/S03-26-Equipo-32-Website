import type { StatisticsRepository } from '@/core/statistics/repositories/statistics.repository.ts';
import type { StatisticsRange } from '@/core/statistics/entities/statistics.entity.ts';

export class GetStatisticsRangeUseCase {
  private statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository;
  }

  /** @param from - Fecha de inicio en formato ISO 8601 (YYYY-MM-DD), ej: '2026-03-01'
   *  @param to   - Fecha de fin en formato ISO 8601 (YYYY-MM-DD), ej: '2026-04-02' */
  execute(from: string, to: string): Promise<StatisticsRange> {
    return this.statisticsRepository.getRange(from, to);
  }
}
