import type { LeadRepository } from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';
import { mapToLeadEntity } from '@/core/database/mappers/lead.mapper.ts';

export class LeadsRepository implements LeadRepository {
  async create(dto: CreateLeadDto): Promise<Lead> {
    const now = Date.now();
    const docRef = await addDoc(collection(db, 'leads'), {
      ...dto,
      createdAt: now,
    });

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Failed to create lead');
    }

    return mapToLeadEntity(snapshot);
  }
}
