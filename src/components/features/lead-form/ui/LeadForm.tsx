import {
  BUSINESS,
  FOUND_US,
  NEEDED_BY,
  VOLUME_PURCHASE,
} from '@/components/share/constants.ts';
import { Input } from '@/components/share/ui/Input.tsx';
import { Select } from '@/components/share/ui/Select.tsx';
import { Textarea } from '@/components/share/ui/Textarea.tsx';
import { Checkbox } from '@/components/share/ui/Checkbox.tsx';
import { Label } from '@/components/share/ui/Label.tsx';
import { ArrowRight, Lock } from 'lucide-react';
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
            <Input
              id="fullName"
              className={'font-dm-sans'}
              placeholder={'Ej: Juan Castro'}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={'flex-1'}>
            <Label htmlFor="businessName">Nombre del negocio *</Label>
            <Input
              id="businessName"
              className={'font-dm-sans'}
              placeholder={'Ej: Boutique Rivera'}
              {...register('businessName')}
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>
        </div>

        <div className={'flex flex-col gap-4 md:flex-row md:gap-6'}>
          <div className={'flex-1'}>
            <Label htmlFor="whatsapp">Número de WhatsApp *</Label>
            <Input
              id="whatsapp"
              className={'font-dm-sans'}
              placeholder={'Ej: +52 55 1234 5678'}
              {...register('whatsapp')}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-xs mt-1">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div className={'flex-1'}>
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              type="email"
              className={'font-dm-sans'}
              placeholder={'Ej: contacto@negocio.com'}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="businessType">Tipo de negocio *</Label>
          <Select
            id="businessType"
            className={'font-dm-sans'}
            {...register('businessType')}
          >
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
          <Label htmlFor="volume">
            ¿De cuánto sería tu pedido aproximado? *
          </Label>
          <Select
            id="volume"
            className={'font-dm-sans'}
            {...register('volumePurchase')}
          >
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
          <Label htmlFor="neededBy">¿Para cuándo necesitas el pedido? *</Label>
          <Select
            id="neededBy"
            className={'font-dm-sans'}
            {...register('neededBy')}
          >
            <option value="">Selecciona una opción</option>
            {Object.entries(NEEDED_BY).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {errors.neededBy && (
            <p className="text-red-500 text-xs mt-1">
              {errors.neededBy.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="foundUs">¿Cómo nos conociste? *</Label>
          <Select
            id="foundUs"
            className={'font-dm-sans'}
            {...register('foundUs')}
          >
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
            ¿Quieres agregar algún comentario? (opcional)
          </Label>
          <Textarea
            id="products"
            className={'font-dm-sans'}
            placeholder={
              'Ej: algún detalle sobre tu pedido, productos de interés o cualquier información que consideres importante'
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
            'bg-[#2D5016] text-[#F5F0E8] p-4 w-full rounded-md disabled:opacity-50 flex items-center justify-center gap-2'
          }
        >
          {isSubmitting ? (
            'Enviando...'
          ) : (
            <>
              <span>Solicitar cotización</span>
              <ArrowRight className={'size-5'} aria-hidden="true" />
            </>
          )}
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
