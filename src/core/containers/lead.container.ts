import { LeadsRepository } from '@/core/database/repositories/leads.repository.ts';
import { CreateLeadUseCase } from '@/core/leads/use-cases/create-lead.use-case.ts';
import { MarkLeadContactedUseCase } from '@/core/leads/use-cases/mark-lead-contacted.use-case.ts';

const leadRepository = new LeadsRepository();

export const leadContainer = {
  createLead: new CreateLeadUseCase(leadRepository),
  markLeadContacted: new MarkLeadContactedUseCase(leadRepository),
};
