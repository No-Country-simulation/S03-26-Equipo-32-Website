import ipwhoClient from '@/core/services/ipwho/ipwho.config.ts';
import type { LeadLocation } from '@/core/leads/entities/leadLocation.entity.ts';

export class GetLeadUbicationUseCase {
  async execute() {
    try {
      const response = await ipwhoClient.getMe();
      const location = response?.data ?? response;

      if (!location) return {};

      const resolvedLocation: LeadLocation = {};
      let countryValue = this.findFirstStringDeep(location, [
        'country',
        'countryName',
      ]);
      let countryCodeValue = this.findFirstStringDeep(location, [
        'countryCode',
        'country_code',
      ]);
      let regionValue = this.findFirstStringDeep(location, [
        'region',
        'regionName',
        'state',
      ]);
      let regionCodeValue = this.findFirstStringDeep(location, [
        'regionCode',
        'region_code',
        'stateCode',
      ]);
      let cityValue = this.findFirstStringDeep(location, ['city']);
      const ipValue = this.findFirstStringDeep(location, ['ip', 'query']);
      let latitudeValue = this.findFirstNumberDeep(location, [
        'latitude',
        'lat',
      ]);
      let longitudeValue = this.findFirstNumberDeep(location, [
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
            this.findFirstStringDeep(fallbackLocation, [
              'country',
              'countryName',
            ]);
          countryCodeValue =
            countryCodeValue ??
            this.findFirstStringDeep(fallbackLocation, [
              'countryCode',
              'country_code',
            ]);
          regionValue =
            regionValue ??
            this.findFirstStringDeep(fallbackLocation, [
              'region',
              'regionName',
              'state',
            ]);
          regionCodeValue =
            regionCodeValue ??
            this.findFirstStringDeep(fallbackLocation, [
              'regionCode',
              'region_code',
              'stateCode',
            ]);
          cityValue =
            cityValue ?? this.findFirstStringDeep(fallbackLocation, ['city']);
          latitudeValue =
            latitudeValue ??
            this.findFirstNumberDeep(fallbackLocation, ['latitude', 'lat']);
          longitudeValue =
            longitudeValue ??
            this.findFirstNumberDeep(fallbackLocation, [
              'longitude',
              'lon',
              'lng',
            ]);
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

      return resolvedLocation;
    } catch {
      return {};
    }
  }

  private normalizeKey = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, '');

  private findFirstStringDeep = (
    root: unknown,
    aliases: string[],
    maxDepth = 5,
  ): string | undefined => {
    const aliasSet = new Set(aliases.map(this.normalizeKey));
    const visited = new Set<object>();

    const walk = (node: unknown, depth: number): string | undefined => {
      if (!node || typeof node !== 'object' || depth > maxDepth)
        return undefined;

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

        if (aliasSet.has(this.normalizeKey(key))) {
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

  private findFirstNumberDeep = (
    root: unknown,
    aliases: string[],
    maxDepth = 5,
  ): number | undefined => {
    const aliasSet = new Set(aliases.map(this.normalizeKey));
    const visited = new Set<object>();

    const walk = (node: unknown, depth: number): number | undefined => {
      if (!node || typeof node !== 'object' || depth > maxDepth)
        return undefined;

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

        if (aliasSet.has(this.normalizeKey(key))) {
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
}
