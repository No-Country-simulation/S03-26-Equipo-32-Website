export interface Lead {
  id: string;
  fullName: string;
  businessName: string;
  whatsapp: string;
  businessType: string;
  volumePurchase: string;
  foundUs: string;
  products: string;
  consent: boolean;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  ip?: string;
  createdAt: number;
  contactedAt?: number;
}
