import { LeadsManagerFilters } from '@/components/pages/leads-manager/ui/LeadsManagerFilters.tsx';

export const LeadsManagerPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold font-cormorant mb-4">
        Gestión de Leads
      </h1>
      <LeadsManagerFilters />
    </div>
  );
};
