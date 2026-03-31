import { LeadsRepository } from '@/core/database/repositories/leads.repository.ts';
import { CreateLeadUseCase } from '@/core/leads/use-cases/create-lead.use-case.ts';

const leadRepository = new LeadsRepository();

export const leadContainer = {
  createLead: new CreateLeadUseCase(leadRepository),
};
