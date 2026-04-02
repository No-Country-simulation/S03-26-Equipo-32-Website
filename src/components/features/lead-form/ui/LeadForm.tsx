import {
  BUSINESS,
  FOUND_US,
  VOLUME_PURCHASE,
} from '@/components/share/constants.ts';
import { Input } from '@/components/share/ui/Input.tsx';
import { Select } from '@/components/share/ui/Select.tsx';
import { Textarea } from '@/components/share/ui/Textarea.tsx';
import { Checkbox } from '@/components/share/ui/Checkbox.tsx';
import { Label } from '@/components/share/ui/Label.tsx';
import { Lock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';
import { useLeadForm } from '@/components/features/lead-form/model/useLeadForm.ts';

type LeadFormProps = React.HTMLAttributes<HTMLDivElement>;

export const LeadForm = ({ ...rest }: LeadFormProps) => {
  const { form, onSubmit, isSubmitting, isSuccess, trackFirstInteraction } =
    useLeadForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div
      {...rest}
      className={twMerge(
        'bg-[#F5F0E8] p-5 space-y-4 rounded-md',
        rest.className,
      )}
    >
      <form
        onSubmit={onSubmit}
        onFocus={trackFirstInteraction}
        className="space-y-4"
      >
        <div className={'flex flex-col gap-4 md:flex-row md:gap-6'}>
          <div className={'flex-1'}>
            <Label htmlFor="fullName">Nombre completo *</Label>
            <Input id="fullName" {...register('fullName')} />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={'flex-1'}>
            <Label htmlFor="businessName">Nombre del negocio *</Label>
            <Input id="businessName" {...register('businessName')} />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="whatsapp">Número de WhatsApp *</Label>
          <Input
            id="whatsapp"
            placeholder={'+52 123 456 7890'}
            {...register('whatsapp')}
          />
          {errors.whatsapp && (
            <p className="text-red-500 text-xs mt-1">
              {errors.whatsapp.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="businessType">Tipo de negocio *</Label>
          <Select id="businessType" {...register('businessType')}>
            <option value="">Selecciona una opción</option>
            {Object.entries(BUSINESS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {errors.businessType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.businessType.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="volume">Volumen de compra estimado (MXN) *</Label>
          <Select id="volume" {...register('volumePurchase')}>
            <option value="">Selecciona una opción</option>
            {Object.entries(VOLUME_PURCHASE).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {errors.volumePurchase && (
            <p className="text-red-500 text-xs mt-1">
              {errors.volumePurchase.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="foundUs">Selecciona cómo nos encontraste *</Label>
          <Select id="foundUs" {...register('foundUs')}>
            <option value="">Selecciona una opción</option>
            {Object.entries(FOUND_US).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {errors.foundUs && (
            <p className="text-red-500 text-xs mt-1">
              {errors.foundUs.message}
            </p>
          )}
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
            {...register('products')}
          />
        </div>

        <div className={'flex items-start gap-2'}>
          <Checkbox id="consent" {...register('consent')} />
          <Label htmlFor="consent" className={'text-xs font-normal'}>
            Acepto recibir información comercial de PLEK por WhatsApp. Entiendo
            que puedo cancelar esta comunicación en cualquier momento.
          </Label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-xs -mt-2">{errors.consent.message}</p>
        )}

        {isSuccess && (
          <p className="text-[#2D5016] text-sm text-center">
            ¡Solicitud enviada con éxito!
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            'bg-[#2D5016] text-[#F5F0E8] p-4 w-full rounded-md disabled:opacity-50'
          }
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar cotización'}
        </button>

        <p
          className={
            'text-black/40 flex flex-row gap-1 items-center justify-center text-xs'
          }
        >
          <Lock className={'size-3'} />
          Tus datos están protegidos. No los compartimos con terceros.
        </p>
      </form>
    </div>
  );
};
