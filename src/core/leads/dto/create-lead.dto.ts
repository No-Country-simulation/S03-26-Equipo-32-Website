import { z } from 'zod';

export const createLeadSchema = z.object({
  fullName: z.string().min(1, 'El nombre es obligatorio'),
  businessName: z.string().min(1, 'El nombre del negocio es obligatorio'),
  whatsapp: z.string().min(1, 'El número de WhatsApp es obligatorio'),
  businessType: z.string().min(1, 'Selecciona un tipo de negocio'),
  volumePurchase: z.string().min(1, 'Selecciona un volumen de compra'),
  foundUs: z.string().min(1, 'Selecciona cómo nos encontraste'),
  products: z.string().default(''),
  consent: z.boolean().refine((val) => val, 'Debes aceptar para continuar'),
});

export type CreateLeadDto = z.output<typeof createLeadSchema>;
export type CreateLeadInput = z.input<typeof createLeadSchema>;
