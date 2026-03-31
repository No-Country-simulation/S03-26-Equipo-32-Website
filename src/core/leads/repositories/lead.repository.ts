import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';

export interface LeadRepository {
  create(dto: CreateLeadDto): Promise<Lead>;
}
