import type {
  LeadDateFilter,
  LeadRepository,
} from '@/core/leads/repositories/lead.repository.ts';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import type { CreateLeadDto } from '@/core/leads/dto/create-lead.dto.ts';
import { IPWho } from '@ipwho/ipwho';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type QueryConstraint,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/core/database/firebase/firebase.config.ts';
import { mapToLeadEntity } from '@/core/database/mappers/lead.mapper.ts';

type LeadLocation = {
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  ip?: string;
  latitude?: number;
  longitude?: number;
};

const ipwhoApiKey = import.meta.env.VITE_IP_WHO;
const ipwhoClient = ipwhoApiKey ? new IPWho(ipwhoApiKey) : null;
const isDev = import.meta.env.DEV;

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

const findFirstStringDeep = (
  root: unknown,
  aliases: string[],
  maxDepth = 5,
): string | undefined => {
  const aliasSet = new Set(aliases.map(normalizeKey));
  const visited = new Set<object>();

  const walk = (node: unknown, depth: number): string | undefined => {
    if (!node || typeof node !== 'object' || depth > maxDepth) return undefined;

    const objectNode = node as object;
    if (visited.has(objectNode)) return undefined;
    visited.add(objectNode);

    for (const key of Reflect.ownKeys(objectNode)) {
      if (typeof key !== 'string') continue;

      let value: unknown;
      try {
        value = (objectNode as Record<string, unknown>)[key];
      } catch {
        continue;
      }

      if (aliasSet.has(normalizeKey(key))) {
        if (typeof value === 'string' && value.trim()) {
          return value;
        }
      }

      const nested = walk(value, depth + 1);
      if (nested) return nested;
    }

    return undefined;
  };

  return walk(root, 0);
};

const findFirstNumberDeep = (
  root: unknown,
  aliases: string[],
  maxDepth = 5,
): number | undefined => {
  const aliasSet = new Set(aliases.map(normalizeKey));
  const visited = new Set<object>();

  const walk = (node: unknown, depth: number): number | undefined => {
    if (!node || typeof node !== 'object' || depth > maxDepth) return undefined;

    const objectNode = node as object;
    if (visited.has(objectNode)) return undefined;
    visited.add(objectNode);

    for (const key of Reflect.ownKeys(objectNode)) {
      if (typeof key !== 'string') continue;

      let value: unknown;
      try {
        value = (objectNode as Record<string, unknown>)[key];
      } catch {
        continue;
      }

      if (aliasSet.has(normalizeKey(key))) {
        if (typeof value === 'number' && Number.isFinite(value)) {
          return value;
        }

        if (typeof value === 'string' && value.trim()) {
          const parsed = Number(value);
          if (Number.isFinite(parsed)) {
            return parsed;
          }
        }
      }

      const nested = walk(value, depth + 1);
      if (nested !== undefined) return nested;
    }

    return undefined;
  };

  return walk(root, 0);
};

const resolveLeadLocation = async (): Promise<LeadLocation> => {
  if (!ipwhoClient) return {};

  try {
    const response = await ipwhoClient.getMe();
    const location = response?.data ?? response;

    if (isDev) {
      console.debug('[LeadsRepository] ipwho raw location', location);
    }

    if (!location) return {};

    const resolvedLocation: LeadLocation = {};
    let countryValue = findFirstStringDeep(location, [
      'country',
      'countryName',
    ]);
    let countryCodeValue = findFirstStringDeep(location, [
      'countryCode',
      'country_code',
    ]);
    let regionValue = findFirstStringDeep(location, [
      'region',
      'regionName',
      'state',
    ]);
    let regionCodeValue = findFirstStringDeep(location, [
      'regionCode',
      'region_code',
      'stateCode',
    ]);
    let cityValue = findFirstStringDeep(location, ['city']);
    let ipValue = findFirstStringDeep(location, ['ip', 'query']);
    let latitudeValue = findFirstNumberDeep(location, ['latitude', 'lat']);
    let longitudeValue = findFirstNumberDeep(location, [
      'longitude',
      'lon',
      'lng',
    ]);

    if (
      ipValue &&
      (!countryValue || !countryCodeValue || !cityValue || !regionValue)
    ) {
      try {
        const fallbackResponse = await ipwhoClient.getIp(ipValue);
        const fallbackLocation = fallbackResponse?.data ?? fallbackResponse;

        countryValue =
          countryValue ??
          findFirstStringDeep(fallbackLocation, ['country', 'countryName']);
        countryCodeValue =
          countryCodeValue ??
          findFirstStringDeep(fallbackLocation, [
            'countryCode',
            'country_code',
          ]);
        regionValue =
          regionValue ??
          findFirstStringDeep(fallbackLocation, [
            'region',
            'regionName',
            'state',
          ]);
        regionCodeValue =
          regionCodeValue ??
          findFirstStringDeep(fallbackLocation, [
            'regionCode',
            'region_code',
            'stateCode',
          ]);
        cityValue =
          cityValue ?? findFirstStringDeep(fallbackLocation, ['city']);
        latitudeValue =
          latitudeValue ??
          findFirstNumberDeep(fallbackLocation, ['latitude', 'lat']);
        longitudeValue =
          longitudeValue ??
          findFirstNumberDeep(fallbackLocation, ['longitude', 'lon', 'lng']);
      } catch {
        // Ignore fallback errors and keep best-effort location.
      }
    }

    if (countryValue) {
      resolvedLocation.country = countryValue;
    }

    if (countryCodeValue) {
      resolvedLocation.countryCode = countryCodeValue;
    }

    if (regionValue) {
      resolvedLocation.region = regionValue;
    }

    if (regionCodeValue) {
      resolvedLocation.regionCode = regionCodeValue;
    }

    if (cityValue) {
      resolvedLocation.city = cityValue;
    }

    if (ipValue) {
      resolvedLocation.ip = ipValue;
    }

    if (
      latitudeValue !== undefined &&
      latitudeValue >= -90 &&
      latitudeValue <= 90
    ) {
      resolvedLocation.latitude = latitudeValue;
    }

    if (
      longitudeValue !== undefined &&
      longitudeValue >= -180 &&
      longitudeValue <= 180
    ) {
      resolvedLocation.longitude = longitudeValue;
    }

    if (isDev) {
      console.debug(
        '[LeadsRepository] ipwho sanitized location',
        resolvedLocation,
      );
    }

    return resolvedLocation;
  } catch {
    return {};
  }
};

export class LeadsRepository implements LeadRepository {
  private COLLECTION = 'leads';

  async create(dto: CreateLeadDto): Promise<Lead> {
    const now = Date.now();
    const location = await resolveLeadLocation();
    const payload = {
      ...dto,
      ...location,
      createdAt: now,
    };

    if (isDev) {
      console.debug('[LeadsRepository] addDoc payload', payload);
    }

    const docRef = await addDoc(collection(db, this.COLLECTION), payload);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Failed to create lead');
    }

    return mapToLeadEntity(snapshot);
  }

  async getAll(filter?: LeadDateFilter): Promise<Lead[]> {
    const leadsCollection = collection(db, this.COLLECTION);
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (filter?.from) {
      const [y, m, d] = filter.from.split('-').map(Number);
      constraints.unshift(
        where('createdAt', '>=', new Date(y, m - 1, d).getTime()),
      );
    }

    if (filter?.to) {
      const [y, m, d] = filter.to.split('-').map(Number);
      constraints.unshift(
        where(
          'createdAt',
          '<=',
          new Date(y, m - 1, d, 23, 59, 59, 999).getTime(),
        ),
      );
    }

    const snapshot = await getDocs(query(leadsCollection, ...constraints));
    return snapshot.docs.map(mapToLeadEntity);
  }

  async markContacted(leadId: string): Promise<void> {
    const leadRef = doc(db, this.COLLECTION, leadId);

    const snapshot = await getDoc(leadRef);

    if (!snapshot.exists()) {
      throw new Error('Lead not found');
    }

    await updateDoc(leadRef, {
      contactedAt: Date.now(),
    });
  }
}
