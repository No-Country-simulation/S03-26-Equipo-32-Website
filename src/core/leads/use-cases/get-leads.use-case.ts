import type {
  LeadRepository,
  LeadDateFilter,
} from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';

export class GetLeadsUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  execute(filter?: LeadDateFilter): Promise<Lead[]> {
    return this.leadRepository.getAll(filter);
  }
}
