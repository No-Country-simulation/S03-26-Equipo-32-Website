import type {
  LeadDateFilter,
  LeadRepository,
} from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  deleteField,
  getDoc,
  getDocs,
  orderBy,
  query,
  type QueryConstraint,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';
import { mapToLeadEntity } from '@/core/database/mappers/lead.mapper.ts';

export class LeadsRepository implements LeadRepository {
  private COLLECTION = 'leads';

  async create(dto: CreateLeadDto): Promise<Lead> {
    const now = Date.now();
    const payload = {
      ...dto,
      createdAt: now,
    };

    const docRef = await addDoc(collection(db, this.COLLECTION), payload);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Failed to create lead');
    }

    return mapToLeadEntity(snapshot);
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

  async markPending(leadId: string): Promise<void> {
    const leadRef = doc(db, this.COLLECTION, leadId);

    const snapshot = await getDoc(leadRef);

    if (!snapshot.exists()) {
      throw new Error('Lead not found');
    }

    await updateDoc(leadRef, {
      contactedAt: deleteField(),
    });
  }

  async delete(leadId: string): Promise<void> {
    const leadRef = doc(db, this.COLLECTION, leadId);
    await deleteDoc(leadRef);
  }
}
