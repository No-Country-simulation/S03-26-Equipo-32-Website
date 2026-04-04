import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

const db = getFirestore();

type LeadDoc = {
  ip?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
};

type GeoLocation = {
  ip?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
};

const resolveGeoLocation = async (ip?: string): Promise<GeoLocation> => {
  if (!ip) return {};

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        Accept: 'application/json',
      },
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
  }
};

const hasLocationData = (lead: LeadDoc) =>
  Boolean(
    lead.country ||
    lead.countryCode ||
    lead.region ||
    lead.regionCode ||
    lead.city,
  );

async function main() {
  const snapshot = await db.collection('leads').get();
  const candidates = snapshot.docs.filter((doc) => {
    const lead = doc.data() as LeadDoc;
    return !hasLocationData(lead) && Boolean(lead.ip);
  });

  if (candidates.length === 0) {
    console.log('No leads to backfill.');
    return;
  }

  let updated = 0;
  let skipped = 0;

  for (const doc of candidates) {
    const lead = doc.data() as LeadDoc;
    const location = await resolveGeoLocation(lead.ip);

    if (
      !location.country &&
      !location.countryCode &&
      !location.region &&
      !location.city
    ) {
      skipped += 1;
      continue;
    }

    await doc.ref.update({
      country: location.country,
      countryCode: location.countryCode,
      region: location.region,
      regionCode: location.regionCode,
      city: location.city,
    });

    updated += 1;
  }

  console.log(
    `Backfill complete. Updated: ${updated}. Skipped: ${skipped}. Total candidates: ${candidates.length}.`,
  );
}

void main().catch((error) => {
  console.error('Backfill failed:', error);
  process.exitCode = 1;
});
