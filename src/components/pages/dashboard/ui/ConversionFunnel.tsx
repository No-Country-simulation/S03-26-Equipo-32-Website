import { FunnelCard } from '@/components/pages/dashboard/ui/FunnelCard.tsx';

interface ConversionFunnelProps {
  pageViews: number;
  formInteractions: number;
  totalLeads: number;
  contacted: number;
}

const pct = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 1000) / 10;

export const ConversionFunnel = ({
  pageViews,
  formInteractions,
  totalLeads,
  contacted,
}: ConversionFunnelProps) => {
  return (
    <div
      className={'border border-md bg-white p-4 rounded-md border-neutral-200'}
    >
      <div className={'text-3xl font-cormorant text-[#162C14]'}>
        Embudo de conversión
      </div>
      <div className={'text-[#78716C] font-dm-sans'}>
        Visualización del recorrido del usuario desde la visita hasta el cierre
      </div>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'}
      >
        <FunnelCard
          label={'Visitantes'}
          labelColor={'#FFFFFF'}
          bgColor={'#2D5A3D'}
          total={pageViews}
          totalColor={'#FFFFFF'}
          percentage={100}
          percentageColor={'rgba(255,255,255,0.5)'}
        />
        <FunnelCard
          label={'Forms iniciados'}
          labelColor={'#FFFFFF'}
          total={formInteractions}
          totalColor={'#FFFFFF'}
          percentage={pct(formInteractions, pageViews)}
          bgColor={'#4A7C59'}
          percentageColor={'rgba(255,255,255,0.5)'}
        />

        <FunnelCard
          label={'Cotiz. enviadas'}
          labelColor={'#FFFFFF'}
          bgColor={'#6B9E7A'}
          percentage={pct(totalLeads, pageViews)}
          total={totalLeads}
          totalColor={'#FFFFFF'}
          percentageColor={'rgba(255,255,255,0.5)'}
        />

        <FunnelCard
          label={'Contactados'}
          labelColor={'#162C14'}
          totalColor={'#162C14'}
          bgColor={'#B8D4BE'}
          percentage={pct(contacted, pageViews)}
          percentageColor={'rgba(22,44,20,0.5)'}
          total={contacted}
        />
      </div>
    </div>
  );
};
