import { IPWho } from '@ipwho/ipwho';
import type {
  LeadLocation,
  LeadLocationProvider,
} from '@/core/leads/services/lead-location.provider.ts';

const ipwhoApiKey = import.meta.env.VITE_IP_WHO;
const ipwhoClient = ipwhoApiKey ? new IPWho(ipwhoApiKey) : null;

const stripUndefined = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as Partial<T>;

export class IpWhoLeadLocationProvider implements LeadLocationProvider {
  async resolve(): Promise<LeadLocation> {
    if (!ipwhoClient) return {};

    try {
      const response = await ipwhoClient.getMe();
      const location = response?.data ?? response;

      if (!location) return {};

      return stripUndefined({
        country: location.country,
        countryCode: location.countryCode,
        region: location.region,
        regionCode: location.regionCode,
        city: location.city,
        ip: location.ip,
      });
    } catch {
      return {};
    }
  }
}
