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
    latitude:
      typeof data?.latitude === 'number'
        ? data.latitude
        : typeof data?.lat === 'number'
          ? data.lat
          : undefined,
    longitude:
      typeof data?.longitude === 'number'
        ? data.longitude
        : typeof data?.lon === 'number'
          ? data.lon
          : undefined,
    createdAt: data?.createdAt ?? 0,
    contactedAt: data?.contactedAt,
  };
}
