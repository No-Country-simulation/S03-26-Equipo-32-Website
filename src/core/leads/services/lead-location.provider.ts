export type LeadLocation = {
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  ip?: string;
};

export interface LeadLocationProvider {
  resolve(): Promise<LeadLocation>;
}
