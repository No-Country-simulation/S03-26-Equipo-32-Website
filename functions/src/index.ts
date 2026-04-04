import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

initializeApp();

const db = getFirestore();

type LeadPayload = {
  fullName: string;
  businessName: string;
  whatsapp: string;
  businessType: string;
  volumePurchase: string;
  foundUs: string;
  products?: string;
  consent: boolean;
};

type GeoLocation = {
  ip?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
};

const readHeader = (
  headers: Record<string, string | string[] | undefined>,
  name: string,
) => {
  const value = headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return value;
};

const getClientIp = (
  headers: Record<string, string | string[] | undefined>,
  fallback?: string,
) => {
  const forwarded = readHeader(headers, 'x-forwarded-for');
  const forwardedIp = forwarded
    ?.split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .pop();
  const realIp =
    fallback ||
    forwardedIp ||
    readHeader(headers, 'x-real-ip') ||
    readHeader(headers, 'cf-connecting-ip');

  if (!realIp) return undefined;

  if (realIp === '::1' || realIp === '127.0.0.1') {
    return undefined;
  }

  return realIp;
};

const resolveGeoLocation = async (ip?: string): Promise<GeoLocation> => {
  if (!ip) return {};

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) return { ip };

    const data = (await response.json()) as {
      country_name?: string;
      country_code?: string;
      region?: string;
      region_code?: string;
      city?: string;
    };

    return {
      ip,
      country: data.country_name,
      countryCode: data.country_code,
      region: data.region,
      regionCode: data.region_code,
      city: data.city,
    };
  } catch {
    return { ip };
  } finally {
    clearTimeout(timeout);
  }
};

const assertString = (value: unknown, field: string) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new HttpsError('invalid-argument', `${field} is required`);
  }

  return value.trim();
};

const stripUndefined = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as Partial<T>;

export const createLeadWithGeo = onCall(async (request) => {
  if (!request.data || typeof request.data !== 'object') {
    throw new HttpsError('invalid-argument', 'Lead payload is required');
  }

  const payload = request.data as Partial<LeadPayload>;

  const fullName = assertString(payload.fullName, 'fullName');
  const businessName = assertString(payload.businessName, 'businessName');
  const whatsapp = assertString(payload.whatsapp, 'whatsapp');
  const businessType = assertString(payload.businessType, 'businessType');
  const volumePurchase = assertString(payload.volumePurchase, 'volumePurchase');
  const foundUs = assertString(payload.foundUs, 'foundUs');
  const consent = Boolean(payload.consent);

  if (!consent) {
    throw new HttpsError('failed-precondition', 'consent must be accepted');
  }

  const ip = getClientIp(request.rawRequest.headers, request.rawRequest.ip);
  const location = await resolveGeoLocation(ip);
  const createdAt = Date.now();

  const leadRef = db.collection('leads').doc();
  const lead = {
    fullName,
    businessName,
    whatsapp,
    businessType,
    volumePurchase,
    foundUs,
    products: payload.products?.trim() ?? '',
    consent,
    country: location.country,
    countryCode: location.countryCode,
    region: location.region,
    regionCode: location.regionCode,
    city: location.city,
    ip: location.ip,
    createdAt,
  };

  const savedLead = {
    id: leadRef.id,
    ...lead,
  };

  await leadRef.set(stripUndefined(lead));

  return { lead: savedLead };
});
