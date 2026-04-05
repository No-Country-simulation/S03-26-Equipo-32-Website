import { BadgeCheck, FileText, Funnel, UserPlus, Users } from 'lucide-react';
import { KPIItem } from '@/components/pages/dashboard/ui/KPIItem.tsx';

interface KPIOverviewProps {
  pageViews: number;
  catalogDownloads: number;
  totalLeads: number;
  contacted: number;
}

export const KPIOverview = ({
  pageViews,
  catalogDownloads,
  totalLeads,
  contacted,
}: KPIOverviewProps) => {
  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 font-dm-sans'
      }
    >
      <KPIItem
        icon={<Users size={20} />}
        value={pageViews.toLocaleString()}
        label={'Visitantes totales'}
      />
      <KPIItem
        icon={<FileText size={20} />}
        value={catalogDownloads.toLocaleString()}
        label={'Clics en catálogo'}
      />
      <KPIItem
        icon={<UserPlus size={20} />}
        value={totalLeads.toLocaleString()}
        label={'Leads generados'}
      />
      <KPIItem
        icon={<Funnel size={20} />}
        value={contacted.toLocaleString()}
        label={'Conversión a contacto'}
      />

      <KPIItem
        icon={<BadgeCheck size={20} />}
        value={'0'}
        label={'Leads calificados'}
      />
    </div>
  );
};
