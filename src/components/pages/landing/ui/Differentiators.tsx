import { DIFFERENTIATORS } from '@/components/share/constants.ts';
import { DifferentiatorsItem } from '@/components/pages/landing/ui/DifferentiatorItem.tsx';

export const Differentiators = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-[#FAFAFA] font-dm-sans">
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto'
        }
      >
        {DIFFERENTIATORS.map((item, index) => (
          <DifferentiatorsItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};
