import type { DocumentSnapshot } from 'firebase/firestore';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';

export function mapToLeadEntity(doc: DocumentSnapshot): Lead {
  const data = doc.data();
  return {
    id: doc.id,
    fullName: data?.fullName ?? '',
    businessName: data?.businessName ?? '',
    whatsapp: data?.whatsapp ?? '',
    businessType: data?.businessType ?? '',
    volumePurchase: data?.volumePurchase ?? '',
    foundUs: data?.foundUs ?? '',
    products: data?.products ?? '',
    consent: data?.consent ?? false,
    country: data?.country,
    countryCode: data?.countryCode,
    region: data?.region,
    regionCode: data?.regionCode,
    city: data?.city,
    ip: data?.ip,
    createdAt: data?.createdAt ?? 0,
    contactedAt: data?.contactedAt,
  };
}
