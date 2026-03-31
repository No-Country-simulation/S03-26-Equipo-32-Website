import { BUSINESS, VOLUME_PURCHASE } from '@/components/share/constants.ts';
import { Input } from '@/components/share/ui/Input.tsx';
import { Select } from '@/components/share/ui/Select.tsx';
import { Textarea } from '@/components/share/ui/Textarea.tsx';
import { Checkbox } from '@/components/share/ui/Checkbox.tsx';
import { Label } from '@/components/share/ui/Label.tsx';
import { Lock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';

type LeadFormProps = React.HTMLAttributes<HTMLDivElement>;

export const LeadForm = ({ ...rest }: LeadFormProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'bg-[#F5F0E8] p-5 space-y-4 rounded-md',
        rest.className,
      )}
    >
      <div className={'flex flex-col gap-4 md:flex-row md:gap-6'}>
        <div className={'flex-1'}>
          <Label htmlFor="fullName">Nombre completo *</Label>
          <Input id="fullName" />
        </div>

        <div className={'flex-1'}>
          <Label htmlFor="businessName">Nombre del negocio *</Label>
          <Input id="businessName" />
        </div>
      </div>

      <div className={''}>
        <Label htmlFor="whatsapp">Número de WhatsApp *</Label>
        <Input id="whatsapp" placeholder={'+52 123 456 7890'} />
      </div>

      <div>
        <Label htmlFor="businessType">Tipo de negocio *</Label>
        <Select id="businessType">
          {Object.entries(BUSINESS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="volume">Volumen de compra estimado (MXN) *</Label>
        <Select id="volume">
          {Object.entries(VOLUME_PURCHASE).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="products">
          ¿Qué productos te llamaron la atención?
        </Label>
        <Textarea
          id="products"
          placeholder={
            'Cuéntanos qué viste en el catálogo o qué estás buscando'
          }
        />
      </div>

      <div className={'flex items-start gap-2'}>
        <Checkbox id="consent" />
        <Label htmlFor="consent" className={'text-xs font-normal'}>
          Acepto recibir información comercial de PLEK por WhatsApp. Entiendo
          que puedo cancelar esta comunicación en cualquier momento.
        </Label>
      </div>

      <button className={'bg-[#2D5016] text-[#F5F0E8] p-4 w-full rounded-md'}>
        Solicitar cotización
      </button>

      <p
        className={
          'text-black/40 flex flex-row gap-1 items-center justify-center text-xs'
        }
      >
        <Lock className={'size-3'} />
        Tus datos están protegidos. No los compartimos con terceros.
      </p>
    </div>
  );
};
