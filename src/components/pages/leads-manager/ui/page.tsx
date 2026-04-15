import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
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
  const [search, setSearch] = useState('');

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
    if (status === 'en-espera' && contacted) return false;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matchName = lead.businessName?.toLowerCase().includes(q);
      const matchContact = lead.fullName?.toLowerCase().includes(q);
      if (!matchName && !matchContact) return false;
    }

    return true;
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
      <h1 className="text-2xl font-semibold font-cormorant mb-4 text-[#162C14]">
        Gestión de Leads
      </h1>

      <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-white mb-4">
        <Search className="size-3 text-gray-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar leads..."
          className="outline-none focus:outline-none bg-transparent placeholder:text-[#6B7280] placeholder:text-sm font-dm-sans text-sm w-full"
        />
      </div>

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
