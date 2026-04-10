import type { LeadRepository } from '@/core/leads/repositories/lead.repository.ts';

export class MarkLeadPendingUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  execute(leadId: string): Promise<void> {
    return this.leadRepository.markPending(leadId);
  }
}
