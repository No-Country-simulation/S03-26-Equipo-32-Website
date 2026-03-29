import { DIFFERENTIATORS } from '@/components/share/constants.ts';
import { DifferentiatorsItem } from '@/components/pages/landing/ui/DifferentiatorItem.tsx';

export const Differentiators = () => {
  return (
    <section className="py-16 px-10 bg-[#FAFAFA] font-dm-sans">
      <div className={'grid grid-cols-3 gap-8 max-w-4xl mx-auto'}>
        {DIFFERENTIATORS.map((item, index) => (
          <DifferentiatorsItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};
