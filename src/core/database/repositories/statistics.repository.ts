import type {
  StatisticsField,
  StatisticsRepository,
} from '@/core/statistics/repositories/statistics.repository.ts';
import type {
  Statistics,
  StatisticsRange,
} from '@/core/statistics/entities/statistics.entity.ts';
import {
  collection,
  doc,
  getDoc,
  getDocsFromServer,
  increment,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';

export const EMPTY_TOTALS = {
  pageViews: 0,
  formInteractions: 0,
  catalogDownloads: 0,
  totalLeads: 0,
  contacted: 0,
};

export class StatisticsFirebaseRepository implements StatisticsRepository {
  private static startOfDayMs(date = new Date()): number {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).getTime();
  }

  private static toISODate(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private static endOfDayMs(isoDate: string): number {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
  }

  async increment(field: StatisticsField): Promise<void> {
    const today = new Date();
    const dayDoc = doc(
      db,
      'stats',
      StatisticsFirebaseRepository.toISODate(today),
    );
    await setDoc(
      dayDoc,
      {
        [field]: increment(1),
        timestamp: StatisticsFirebaseRepository.startOfDayMs(today),
      },
      { merge: true },
    );
  }

  private static docToDay(id: string, data: Omit<Statistics, 'id'>) {
    return {
      date: id,
      pageViews: data.pageViews ?? 0,
      formInteractions: data.formInteractions ?? 0,
      catalogDownloads: data.catalogDownloads ?? 0,
      totalLeads: data.totalLeads ?? 0,
      contacted: data.contacted ?? 0,
    };
  }

  async getRange(from: string, to: string): Promise<StatisticsRange> {
    const totals = { ...EMPTY_TOTALS };
    const byDay: StatisticsRange['byDay'] = [];

    if (from === to) {
      const dayDoc = doc(db, 'stats', from);
      const snap = await getDoc(dayDoc);
      if (snap.exists()) {
        const day = StatisticsFirebaseRepository.docToDay(
          snap.id,
          snap.data() as Omit<Statistics, 'id'>,
        );
        totals.pageViews = day.pageViews;
        totals.formInteractions = day.formInteractions;
        totals.catalogDownloads = day.catalogDownloads;
        totals.totalLeads = day.totalLeads;
        totals.contacted = day.contacted;
        byDay.push(day);
      }
      return { totals, byDay };
    }

    const fromMs = StatisticsFirebaseRepository.startOfDayMs(
      new Date(`${from}T00:00:00`),
    );
    const toMs = StatisticsFirebaseRepository.endOfDayMs(to);

    const statsCollection = collection(db, 'stats');
    const q = query(
      statsCollection,
      where('timestamp', '>=', fromMs),
      where('timestamp', '<=', toMs),
      orderBy('timestamp'),
    );

    const snapshot = await getDocsFromServer(q);

    snapshot.forEach((docSnap) => {
      const day = StatisticsFirebaseRepository.docToDay(
        docSnap.id,
        docSnap.data() as Omit<Statistics, 'id'>,
      );
      totals.pageViews += day.pageViews;
      totals.formInteractions += day.formInteractions;
      totals.catalogDownloads += day.catalogDownloads;
      totals.totalLeads += day.totalLeads;
      totals.contacted += day.contacted;
      byDay.push(day);
    });

    return { totals, byDay };
  }
}
