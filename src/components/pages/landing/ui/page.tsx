import { Hero } from '@/components/pages/landing/ui/Hero.tsx';
import { Navbar } from '@/components/pages/landing/ui/Navbar.tsx';
import { Differentiators } from '@/components/pages/landing/ui/Differentiators.tsx';
import { HowItWorks } from '@/components/pages/landing/ui/HowItWorks.tsx';
import { PopularCatalog } from '@/components/pages/landing/ui/PopularCatalog.tsx';
import { Testimonials } from '@/components/pages/landing/ui/Testimonials.tsx';
import { Contact } from '@/components/pages/landing/ui/Contact.tsx';
import { FAQ } from '@/components/pages/landing/ui/FAQ.tsx';
import { Footer } from '@/components/pages/landing/ui/Footer.tsx';

export const HomePage = () => {
  return (
    <div className="bg-[#FDF9F1]">
      <Navbar />
      <Hero />
      <Differentiators />
      <HowItWorks />
      <PopularCatalog />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
};
