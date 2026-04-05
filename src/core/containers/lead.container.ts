import { LeadsRepository } from '@/core/database/repositories/leads.repository.ts';
import { CreateLeadUseCase } from '@/core/leads/use-cases/create-lead.use-case.ts';
import { MarkLeadContactedUseCase } from '@/core/leads/use-cases/mark-lead-contacted.use-case.ts';
import { GetLeadsUseCase } from '@/core/leads/use-cases/get-leads.use-case.ts';
import { GetLeadUbicationUseCase } from '@/core/leads/use-cases/get-lead-ubication.use-case.ts';

const leadRepository = new LeadsRepository();

export const leadContainer = {
  createLead: new CreateLeadUseCase(leadRepository),
  markLeadContacted: new MarkLeadContactedUseCase(leadRepository),
  getLeads: new GetLeadsUseCase(leadRepository),
  getLeadUbication: new GetLeadUbicationUseCase(),
};
