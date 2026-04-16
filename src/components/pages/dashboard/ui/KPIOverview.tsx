import { BadgeCheck, FileText, Funnel, UserPlus, Users } from 'lucide-react';
import { KPIItem } from '@/components/pages/dashboard/ui/KPIItem.tsx';

interface KPIOverviewProps {
  pageViews: number;
  catalogDownloads: number;
  totalLeads: number;
  contacted: number;
}

const conversionPct = (contacted: number, totalLeads: number) => {
  if (totalLeads === 0) return '0%';
  return (Math.round((contacted / totalLeads) * 1000) / 10).toFixed(1) + '%';
};

export const KPIOverview = ({
  pageViews,
  catalogDownloads,
  totalLeads,
  contacted,
}: KPIOverviewProps) => {
  return (
    <div className={'grid grid-cols-2 lg:grid-cols-5 gap-4 font-dm-sans'}>
      <KPIItem
        icon={<Users size={20} />}
        value={pageViews.toLocaleString()}
        label={'Visitantes totales'}
        trend={12.5}
      />
      <KPIItem
        icon={<FileText size={20} />}
        value={catalogDownloads.toLocaleString()}
        label={'Clics en catálogo'}
        trend={8.3}
      />
      <KPIItem
        icon={<UserPlus size={20} />}
        value={totalLeads.toLocaleString()}
        label={'Leads generados'}
        trend={15.7}
      />
      <KPIItem
        icon={<Funnel size={20} />}
        value={conversionPct(contacted, totalLeads)}
        label={'Conversión a contacto'}
        trend={2.1}
      />
      <KPIItem
        icon={<BadgeCheck size={20} />}
        value={'0'}
        label={'Leads calificados'}
        trend={15.9}
        className={'col-span-2 lg:col-span-1'}
      />
    </div>
  );
};
