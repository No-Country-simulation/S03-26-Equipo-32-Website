import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';

export interface LeadDateFilter {
  from?: string; // YYYY-MM-DD
  to?: string; // YYYY-MM-DD
}

export interface LeadRepository {
  create(dto: CreateLeadDto): Promise<Lead>;
  markContacted(leadId: string): Promise<void>;
  getAll(filter?: LeadDateFilter): Promise<Lead[]>;
}
