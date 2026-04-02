import { ConversionFunnel } from '@/components/pages/dashboard/ui/ConversionFunnel.tsx';
import { useStats } from '@/components/features/statistics/model/useStats.ts';
import { useDashboardFilter } from '@/components/pages/dashboard/model/useDashboardFilter.ts';
import { DashboardHeader } from '@/components/pages/dashboard/ui/DashboardHeader.tsx';
import { KPIOverview } from '@/components/pages/dashboard/ui/KPIOverview.tsx';

export const DashboardPage = () => {
  const { from, to } = useDashboardFilter();
  const { stats } = useStats(from, to);

  return (
    <div className={'flex flex-col gap-4 p-4'}>
      <DashboardHeader />
      <KPIOverview
        pageViews={stats.totals.pageViews}
        catalogDownloads={stats.totals.catalogDownloads}
        totalLeads={stats.totals.totalLeads}
        contacted={stats.totals.contacted}
      />
      <ConversionFunnel
        pageViews={stats.totals.pageViews}
        formInteractions={stats.totals.formInteractions}
        totalLeads={stats.totals.totalLeads}
        contacted={stats.totals.contacted}
      />
    </div>
  );
};
