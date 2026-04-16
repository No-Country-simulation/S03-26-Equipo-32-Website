import { Logo } from '@/components/share/ui/logo.tsx';
import { Mail, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/share/ui/WhatsAppIcon.tsx';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '@/components/share/constants.ts';

export const Footer = () => {
  return (
    <div className={'w-full bg-[#2D5016] text-[#F5F0E8] font-dm-sans'}>
      <div
        className={
          'grid grid-cols-1 md:grid-cols-12 p-6 md:p-10 max-w-6xl mx-auto gap-4'
        }
      >
        <div className={'md:col-span-4 py-4 space-y-2'}>
          <Logo />
          <p className={'text-sm mt-10'}>
            Origami en piel. Mayoreo directo desde León, Guanajuato, México.
          </p>
          <p className={'text-xs'}>
            © 2026 PLEK. Todos los derechos reservados.
          </p>
        </div>
        <div className={'md:col-span-4 text-center text-white py-4'}>
          <p className={'text-sm text-center'}>
            ¿Prefieres hablar directamente?
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className={
              'border border-white rounded-md px-4 py-2 mt-4 flex items-center gap-2 mx-auto text-sm hover:bg-[#35561E] transition-colors w-fit'
            }
          >
            <WhatsAppIcon className={'size-4'} /> WhatsApp
          </a>
        </div>
        <div className={'md:col-span-4 text-white py-4 space-y-2'}>
          <p className={'text-sm flex items-center gap-1'}>
            <Mail className={'size-3'} />
            ventas@plekmoda.com
          </p>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
            className={'text-sm flex items-center gap-1 hover:underline'}
          >
            <img
              src="/landing/instagram.svg"
              alt=""
              aria-hidden="true"
              className="size-3"
            />
            @plekmoda
          </a>
          <a
            href="https://maps.app.goo.gl/eZh5xvMgZs6Yprst6"
            target="_blank"
            rel="noreferrer"
            className={'text-sm flex items-center gap-1 hover:underline'}
          >
            <MapPin className={'size-3'} />
            León, Guanajuato
          </a>
        </div>
      </div>

      <div className={'border-b border-[#35561E] w-full'} />

      <div
        className={
          'flex flex-col sm:flex-row items-center justify-between text-xs p-6 md:p-10 max-w-6xl mx-auto gap-4'
        }
      >
        <p>© 2026 PLEK</p>
        <p>León, Guanajuato · Mexico</p>
      </div>
    </div>
  );
};
