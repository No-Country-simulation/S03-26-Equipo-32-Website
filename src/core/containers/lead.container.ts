import { LeadsRepository } from '@/core/database/repositories/leads.repository.ts';
import { IpWhoLeadLocationProvider } from '@/core/database/services/ipwho-lead-location.provider.ts';
import { CreateLeadUseCase } from '@/core/leads/use-cases/create-lead.use-case.ts';
import { MarkLeadContactedUseCase } from '@/core/leads/use-cases/mark-lead-contacted.use-case.ts';
import { GetLeadsUseCase } from '@/core/leads/use-cases/get-leads.use-case.ts';

const leadRepository = new LeadsRepository(new IpWhoLeadLocationProvider());

export const leadContainer = {
  createLead: new CreateLeadUseCase(leadRepository),
  markLeadContacted: new MarkLeadContactedUseCase(leadRepository),
  getLeads: new GetLeadsUseCase(leadRepository),
};
