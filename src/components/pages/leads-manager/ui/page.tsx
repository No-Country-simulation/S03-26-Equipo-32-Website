import { useEffect, useState } from 'react';
import { LeadsManagerFilters } from '@/components/pages/leads-manager/ui/LeadsManagerFilters.tsx';
import { LeadsTable } from '@/components/pages/leads-manager/ui/LeadsTable.tsx';
import { usePriorityFilter } from '@/components/pages/leads-manager/model/usePriorityFilter.ts';
import { useUrgencyFilter } from '@/components/pages/leads-manager/model/useUrgencyFilter.ts';
import { useStatusFilter } from '@/components/pages/leads-manager/model/useStatusFilter.ts';
import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { useLeads } from '@/components/features/leads/model/useLeads.ts';
import { leadContainer } from '@/core/containers/lead.container.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import {
  calculateScore,
  getPriority,
  getUrgency,
} from '@/components/pages/leads-manager/lib/scoreLeads.ts';
import { ScoringRules } from '@/components/pages/leads-manager/ui/ScoringRules.tsx';

export const LeadsManagerPage = () => {
  const { from, to } = useDashboardFilter();
  const [priority] = usePriorityFilter();
  const [urgency] = useUrgencyFilter();
  const [status] = useStatusFilter();

  const { leads: fetchedLeads } = useLeads({ from, to });
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(fetchedLeads);
  }, [fetchedLeads]);

  const filteredLeads = leads.filter((lead) => {
    const score = calculateScore(lead);

    if (priority !== 'todos' && getPriority(score) !== priority) return false;

    if (urgency !== 'todos' && getUrgency(lead) !== urgency) return false;

    const contacted = !!lead.contactedAt;
    if (status === 'contactado' && !contacted) return false;
    return !(status === 'en-espera' && contacted);
  });

  const handleDeleteLead = async (id: string) => {
    await leadContainer.deleteLead.execute(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleContactLead = async (lead: Lead) => {
    await leadContainer.markLeadContacted.execute(lead.id);
    const number = lead.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${number}`, '_blank');
  };

  const handleMarkLeadContacted = async (lead: Lead) => {
    await leadContainer.markLeadContacted.execute(lead.id);
    setLeads((prev) =>
      prev.map((item) =>
        item.id === lead.id ? { ...item, contactedAt: Date.now() } : item,
      ),
    );
  };

  const handleMarkLeadPending = async (lead: Lead) => {
    await leadContainer.markLeadPending.execute(lead.id);
    setLeads((prev) =>
      prev.map((item) =>
        item.id === lead.id ? { ...item, contactedAt: undefined } : item,
      ),
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold font-cormorant mb-4">
        Gestión de Leads
      </h1>
      <LeadsManagerFilters />
      <LeadsTable
        leads={filteredLeads}
        onDelete={handleDeleteLead}
        onContact={handleContactLead}
        onMarkContacted={handleMarkLeadContacted}
        onMarkPending={handleMarkLeadPending}
      />
      <ScoringRules />
    </div>
  );
};
