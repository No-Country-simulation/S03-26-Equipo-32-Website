import type { StatisticsRepository } from '@/core/statistics/repositories/statistics.repository.ts';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';

const STATISTICS_DOC = doc(db, 'statistics', 'landing');

export class StatisticsFirebaseRepository implements StatisticsRepository {
  async increment(
    field: 'pageViews' | 'formInteractions' | 'catalogDownloads',
  ): Promise<void> {
    await setDoc(STATISTICS_DOC, { [field]: increment(1) }, { merge: true });
  }
}
