import { StatisticsFirebaseRepository } from '@/core/database/repositories/statistics.repository.ts';
import { TrackPageViewUseCase } from '@/core/statistics/use-cases/track-page-view.use-case.ts';
import { TrackFormInteractionUseCase } from '@/core/statistics/use-cases/track-form-interaction.use-case.ts';
import { TrackCatalogDownloadUseCase } from '@/core/statistics/use-cases/track-catalog-download.use-case.ts';

const statisticsRepository = new StatisticsFirebaseRepository();

export const statisticsContainer = {
  trackPageView: new TrackPageViewUseCase(statisticsRepository),
  trackFormInteraction: new TrackFormInteractionUseCase(statisticsRepository),
  trackCatalogDownload: new TrackCatalogDownloadUseCase(statisticsRepository),
};
