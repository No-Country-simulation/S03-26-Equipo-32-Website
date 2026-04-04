import type {
  LeadDateFilter,
  LeadRepository,
} from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type QueryConstraint,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, functions } from '@/core/database/firebase/firebase.config.ts';
import { mapToLeadEntity } from '@/core/database/mappers/lead.mapper.ts';
import { addDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { statisticsContainer } from '@/core/containers/statistics.container.ts';

type CreateLeadResponse = {
  lead: Lead;
};

export class LeadsRepository implements LeadRepository {
  private COLLECTION = 'leads';

  async create(dto: CreateLeadDto): Promise<Lead> {
    try {
      const createLeadWithGeo = httpsCallable<
        CreateLeadDto,
        CreateLeadResponse
      >(functions, 'createLeadWithGeo');

      const response = await createLeadWithGeo(dto);
      if (response.data?.lead) {
        await statisticsContainer.trackLeadSubmitted.execute();
        return response.data.lead;
      }
    } catch {
      const now = Date.now();
      const docRef = await addDoc(collection(db, this.COLLECTION), {
        ...dto,
        createdAt: now,
      });

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        await statisticsContainer.trackLeadSubmitted.execute();
        return mapToLeadEntity(snapshot);
      }
    }

    throw new Error('Failed to create lead');
  }

  async getAll(filter?: LeadDateFilter): Promise<Lead[]> {
    const leadsCollection = collection(db, this.COLLECTION);
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (filter?.from) {
      const [y, m, d] = filter.from.split('-').map(Number);
      constraints.unshift(
        where('createdAt', '>=', new Date(y, m - 1, d).getTime()),
      );
    }

    if (filter?.to) {
      const [y, m, d] = filter.to.split('-').map(Number);
      constraints.unshift(
        where(
          'createdAt',
          '<=',
          new Date(y, m - 1, d, 23, 59, 59, 999).getTime(),
        ),
      );
    }

    const snapshot = await getDocs(query(leadsCollection, ...constraints));
    return snapshot.docs.map(mapToLeadEntity);
  }

  async markContacted(leadId: string): Promise<void> {
    const leadRef = doc(db, this.COLLECTION, leadId);

    const snapshot = await getDoc(leadRef);

    if (!snapshot.exists()) {
      throw new Error('Lead not found');
    }

    await updateDoc(leadRef, {
      contactedAt: Date.now(),
    });
  }
}
