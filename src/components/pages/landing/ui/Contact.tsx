import { LeadForm } from '@/components/features/lead-form/ui/LeadForm.tsx';
import { CircleCheck, Clock, Shield } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="py-16 bg-white">
      <div className={'max-w-6xl mx-auto w-full'}>
        <div className={'grid grid-cols-12 items-center gap-10'}>
          <div className={'col-span-4 flex flex-col gap-4'}>
            <div className={'text-[#8B4513] text-xs uppercase'}>
              comienza ahora
            </div>

            <div className={'font-cormorant text-4xl'}>
              Solicita tu cotización personalizada
            </div>

            <p className={'text-[#1A1A1A] text-sm max-w-md'}>
              Llena el formulario y te contactaremos por WhatsApp en menos de 24
              horas para preparar tu cotización personalizada con descuento.
            </p>

            <ul className={'text-[#8B4513] text-sm'}>
              <li className={'flex flex-row gap-1 items-center'}>
                <Clock className={'size-3 text-[#1A1A1A]'} /> Respuesta en menos
                de 24 horas.
              </li>
              <li className={'flex flex-row gap-1 items-center'}>
                <CircleCheck className={'size-3 text-[#1A1A1A]'} />
                Piel certificada LWG.
              </li>
              <li className={'flex flex-row gap-1 items-center'}>
                <Shield className={'size-3 text-[#1A1A1A]'} />
                Directo del fabricante.
              </li>
            </ul>
          </div>

          <div className={'col-span-8'}>
            <LeadForm className={'max-w-xl mx-auto'} />
          </div>
        </div>
      </div>
    </div>
  );
};
