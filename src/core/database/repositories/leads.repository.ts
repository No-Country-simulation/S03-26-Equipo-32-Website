import type { LeadRepository } from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';
import { mapToLeadEntity } from '@/core/database/mappers/lead.mapper.ts';

export class LeadsRepository implements LeadRepository {
  private COLLECTION = 'leads';

  async create(dto: CreateLeadDto): Promise<Lead> {
    const now = Date.now();
    const docRef = await addDoc(collection(db, this.COLLECTION), {
      ...dto,
      createdAt: now,
    });

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Failed to create lead');
    }

    return mapToLeadEntity(snapshot);
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
