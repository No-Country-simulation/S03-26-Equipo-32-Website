import { Hero } from '@/components/pages/landing/ui/Hero.tsx';
import { Navbar } from '@/components/pages/landing/ui/Navbar.tsx';
import { Differentiators } from '@/components/pages/landing/ui/Differentiators.tsx';
import { HowItWorks } from '@/components/pages/landing/ui/HowItWorks.tsx';
import { PopularCatalog } from '@/components/pages/landing/ui/PopularCatalog.tsx';
import { Testimonials } from '@/components/pages/landing/ui/Testimonials.tsx';

export const HomePage = () => {
  return (
    <div className="bg-[#FDF9F1]">
      <Navbar />
      <Hero />
      <Differentiators />
      <HowItWorks />
      <PopularCatalog />
      <Testimonials />
    </div>
  );
};
