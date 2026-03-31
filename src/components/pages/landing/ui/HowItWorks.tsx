import { HOW_IT_WORKS } from '@/components/share/constants.ts';
import { HowItWorksItem } from '@/components/pages/landing/ui/HowItWorksItem.tsx';

export const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-16 bg-[#F5F0E8]">
      <div className={'text-[#8B4513] text-xs'}>CÓMO FUNCIONA</div>
      <div className={'font-cormorant text-4xl'}>Cuatro pasos simples</div>

      <div className={'flex flex-col gap-8'}>
        {HOW_IT_WORKS.map((item, index) => (
          <HowItWorksItem
            key={index}
            title={item.title}
            description={item.description}
            step={index + 1}
          />
        ))}
      </div>
    </div>
  );
};
