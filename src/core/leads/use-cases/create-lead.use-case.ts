import type { LeadRepository } from '@/core/leads/repositories/lead.repository.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';

export class CreateLeadUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  execute(dto: CreateLeadDto) {
    return this.leadRepository.create(dto);
  }
}
