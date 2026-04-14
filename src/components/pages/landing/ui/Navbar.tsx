import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/share/ui/logo.tsx';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Preguntas frecuentes', href: '#faq' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY.current || currentY < 10);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      className={`bg-[#193903] sticky top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 ">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="hover:text-white/70 font-dm-sans tracking-wide transition-colors uppercase text-[#F6F6F6] text-xs"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white cursor-pointer"
          aria-label="Abrir menú"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white/80 hover:text-white text-sm font-dm-sans tracking-wide transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
