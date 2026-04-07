import { z } from 'zod';

export const createLeadSchema = z.object({
  fullName: z.string().min(1, 'El nombre es obligatorio'),
  businessName: z.string().min(1, 'El nombre del negocio es obligatorio'),
  whatsapp: z.string().min(1, 'El número de WhatsApp es obligatorio'),
  email: z.string().email('Ingresa un correo válido'),
  businessType: z.string().min(1, 'Selecciona un tipo de negocio'),
  volumePurchase: z.string().min(1, 'Selecciona un volumen de compra'),
  neededBy: z.string().min(1, 'Selecciona cuándo necesitas el pedido'),
  foundUs: z.string().min(1, 'Selecciona cómo nos encontraste'),
  products: z.string().default(''),
  consent: z.boolean().refine((val) => val, 'Debes aceptar para continuar'),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
  regionCode: z.string().optional(),
  city: z.string().optional(),
  ip: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateLeadDto = z.output<typeof createLeadSchema>;
export type CreateLeadInput = z.input<typeof createLeadSchema>;
