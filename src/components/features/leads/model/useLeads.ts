import { useEffect, useState } from 'react';
import { leadContainer } from '@/core/containers/lead.container.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { LeadDateFilter } from '@/core/leads/repositories/lead.repository.ts';

export const useLeads = (filter?: LeadDateFilter) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    leadContainer.getLeads.execute(filter).then(setLeads);
  }, [filter, filter?.from, filter?.to]);

  return { leads };
};
