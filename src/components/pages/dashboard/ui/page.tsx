import { ConversionFunnel } from '@/components/pages/dashboard/ui/ConversionFunnel.tsx';
import { useStats } from '@/components/features/statistics/model/useStats.ts';
import { useLeads } from '@/components/features/leads/model/useLeads.ts';

export const DashboardPage = () => {
  const { stats } = useStats(); // TODO: Conectar a lo que se necesite del dashboard
  const { leads } = useLeads(); // TODO: Conectar a lo que se necesite del dashboard

  return (
    <div>
      <ConversionFunnel />
    </div>
  );
};
