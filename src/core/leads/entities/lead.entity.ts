export interface Lead {
  id: string;
  fullName: string;
  businessName: string;
  whatsapp: string;
  email: string;
  businessType: string;
  volumePurchase: string;
  neededBy: string;
  foundUs: string;
  products: string;
  consent: boolean;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  ip?: string;
  latitude?: number;
  longitude?: number;
  createdAt: number;
  contactedAt?: number;
}
