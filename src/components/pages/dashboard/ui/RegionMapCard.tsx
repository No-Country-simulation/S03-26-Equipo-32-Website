import { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import countries110m from 'world-atlas/countries-110m.json';
import type { LeadsRegionItem } from '@/components/pages/dashboard/model/useLeadsDashboard.ts';

type RegionMapCardProps = {
  regions: LeadsRegionItem[];
};

type MapMarker = {
  label: string;
  lat: number;
  lon: number;
  groupSize: number;
  leads: number;
  country?: string;
  region?: string;
  city?: string;
};

type CountryRankItem = {
  label: string;
  leads: number;
  percent: number;
};

const countryGeoPoints: Record<string, { lat: number; lon: number }> = {
  mx: { lat: 23.6345, lon: -102.5528 },
  mexico: { lat: 23.6345, lon: -102.5528 },
  us: { lat: 39.8283, lon: -98.5795 },
  usa: { lat: 39.8283, lon: -98.5795 },
  unitedstates: { lat: 39.8283, lon: -98.5795 },
  unitedstatesofamerica: { lat: 39.8283, lon: -98.5795 },
  ca: { lat: 56.1304, lon: -106.3468 },
  canada: { lat: 56.1304, lon: -106.3468 },
  gt: { lat: 15.7835, lon: -90.2308 },
  guatemala: { lat: 15.7835, lon: -90.2308 },
  co: { lat: 4.5709, lon: -74.2973 },
  colombia: { lat: 4.5709, lon: -74.2973 },
  pe: { lat: -9.19, lon: -75.0152 },
  peru: { lat: -9.19, lon: -75.0152 },
  ar: { lat: -38.4161, lon: -63.6167 },
  argentina: { lat: -38.4161, lon: -63.6167 },
  br: { lat: -14.235, lon: -51.9253 },
  brazil: { lat: -14.235, lon: -51.9253 },
  es: { lat: 40.4637, lon: -3.7492 },
  spain: { lat: 40.4637, lon: -3.7492 },
  fr: { lat: 46.2276, lon: 2.2137 },
  france: { lat: 46.2276, lon: 2.2137 },
  pt: { lat: 39.3999, lon: -8.2245 },
  portugal: { lat: 39.3999, lon: -8.2245 },
  gb: { lat: 55.3781, lon: -3.436 },
  uk: { lat: 55.3781, lon: -3.436 },
  unitedkingdom: { lat: 55.3781, lon: -3.436 },
  de: { lat: 51.1657, lon: 10.4515 },
  germany: { lat: 51.1657, lon: 10.4515 },
  it: { lat: 41.8719, lon: 12.5674 },
  italy: { lat: 41.8719, lon: 12.5674 },
  nl: { lat: 52.1326, lon: 5.2913 },
  netherlands: { lat: 52.1326, lon: 5.2913 },
  ch: { lat: 46.8182, lon: 8.2275 },
  switzerland: { lat: 46.8182, lon: 8.2275 },
  ma: { lat: 31.7917, lon: -7.0926 },
  morocco: { lat: 31.7917, lon: -7.0926 },
  ng: { lat: 9.082, lon: 8.6753 },
  nigeria: { lat: 9.082, lon: 8.6753 },
  za: { lat: -30.5595, lon: 22.9375 },
  southafrica: { lat: -30.5595, lon: 22.9375 },
  eg: { lat: 26.8206, lon: 30.8025 },
  egypt: { lat: 26.8206, lon: 30.8025 },
  tr: { lat: 38.9637, lon: 35.2433 },
  turkey: { lat: 38.9637, lon: 35.2433 },
  ae: { lat: 23.4241, lon: 53.8478 },
  uae: { lat: 23.4241, lon: 53.8478 },
  in: { lat: 20.5937, lon: 78.9629 },
  india: { lat: 20.5937, lon: 78.9629 },
  cn: { lat: 35.8617, lon: 104.1954 },
  china: { lat: 35.8617, lon: 104.1954 },
  jp: { lat: 36.2048, lon: 138.2529 },
  japan: { lat: 36.2048, lon: 138.2529 },
  kr: { lat: 35.9078, lon: 127.7669 },
  southkorea: { lat: 35.9078, lon: 127.7669 },
  au: { lat: -25.2744, lon: 133.7751 },
  australia: { lat: -25.2744, lon: 133.7751 },
};

const normalizeText = (value?: string) =>
  value
    ? value
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^a-z0-9]+/g, '')
    : '';

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const getCountryPoint = (region: LeadsRegionItem) => {
  const lookupKeys = [
    normalizeText(region.countryCode),
    normalizeText(region.country),
    normalizeText(region.label),
  ].filter(Boolean);

  for (const key of lookupKeys) {
    if (countryGeoPoints[key]) {
      return countryGeoPoints[key];
    }
  }

  for (const key of Object.keys(countryGeoPoints)) {
    if (lookupKeys.some((value) => value.includes(key))) {
      return countryGeoPoints[key];
    }
  }

  const fallbackLat = (hashString(region.label) % 120) / 2 - 30;
  const fallbackLon = (hashString(`${region.label}:lon`) % 260) / 2 - 65;

  return { lat: fallbackLat, lon: fallbackLon };
};

const buildMarkers = (regions: LeadsRegionItem[]): MapMarker[] => {
  const countryGroups = new Map<
    string,
    {
      label: string;
      leads: number;
      regions: LeadsRegionItem[];
      country?: string;
    }
  >();

  regions.forEach((region) => {
    const label = region.country?.trim() || 'Sin país';
    const current = countryGroups.get(label) ?? {
      label,
      leads: 0,
      regions: [],
      country: region.country,
    };

    current.leads += region.leads;
    current.regions.push(region);
    countryGroups.set(label, current);
  });

  return [...countryGroups.values()].map((group, index) => {
    const representative = group.regions[0];
    const point = getCountryPoint(
      representative ?? ({ label: group.label } as LeadsRegionItem),
    );
    const seed = hashString(`${group.label}:${group.leads}:${index}`);
    const primaryCity =
      group.regions.find((region) => region.city?.trim())?.city?.trim() ?? '';
    const primaryRegion =
      group.regions.find((region) => region.region?.trim())?.region?.trim() ??
      '';

    return {
      label: group.label,
      leads: group.leads,
      groupSize: group.regions.length,
      country: representative?.country || group.label,
      region: primaryRegion,
      city: primaryCity,
      lon: Math.min(165, Math.max(-165, point.lon + ((seed % 7) - 3) * 1.2)),
      lat: Math.min(
        70,
        Math.max(-45, point.lat + (((seed >> 3) % 7) - 3) * 0.8),
      ),
    };
  });
};

const buildCountryRanking = (regions: LeadsRegionItem[]): CountryRankItem[] => {
  const countryMap = new Map<string, number>();

  regions.forEach((region) => {
    const label = region.country?.trim() || 'Sin país';
    countryMap.set(label, (countryMap.get(label) ?? 0) + region.leads);
  });

  const total = [...countryMap.values()].reduce((acc, value) => acc + value, 0);

  return [...countryMap.entries()]
    .map(([label, leads]) => ({
      label,
      leads,
      percent: total > 0 ? Math.round((leads / total) * 100) : 0,
    }))
    .sort((left, right) => right.leads - left.leads)
    .slice(0, 3);
};

export const RegionMapCard = ({ regions }: RegionMapCardProps) => {
  const hasRegions = regions.length > 0;
  const markers = useMemo(() => buildMarkers(regions).slice(0, 8), [regions]);
  const countryRanking = useMemo(() => buildCountryRanking(regions), [regions]);
  const topCountry = countryRanking[0];
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapZoom, setMapZoom] = useState(175);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 16]);

  const resetMapView = () => {
    setSelectedMarker(null);
    setMapZoom(175);
    setMapCenter([0, 16]);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setMapZoom(380);
    setMapCenter([marker.lon, marker.lat]);
  };

  return (
    <section
      className={
        'overflow-hidden rounded-[18px] border border-[#EFE7DE] bg-[#E9E5DE] shadow-[0_20px_40px_rgba(40,30,20,0.08)]'
      }
    >
      <div className={'px-6 pt-8 pb-4'}>
        <h2
          className={
            'font-cormorant text-[22px] leading-7 font-semibold text-[#3B2F24]'
          }
        >
          Clientes por región
        </h2>
        <p
          className={
            'font-dm-sans text-[11px] uppercase tracking-[0.24em] text-[#8B8176]'
          }
        >
          Interés activo
        </p>
      </div>

      <div className={'px-6 pb-6'}>
        <div
          className={
            'relative h-96 overflow-hidden rounded-[14px] border border-[#1F2733] bg-[#0B0F14] lg:h-136'
          }
        >
          <div
            className={
              'absolute top-4 left-4 z-20 max-w-60 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]'
            }
          >
            <p
              className={
                'font-dm-sans text-[11px] uppercase tracking-[0.2em] text-white/55'
              }
            >
              País con más leads
            </p>
            {topCountry ? (
              <div className={'mt-1'}>
                <div
                  className={
                    'text-[22px] leading-tight font-semibold text-white'
                  }
                >
                  {topCountry.label}
                </div>
                <p className={'mt-1 text-sm text-white/75 font-dm-sans'}>
                  {topCountry.leads} leads · {topCountry.percent}% del total
                </p>
              </div>
            ) : (
              <p className={'mt-1 text-sm text-white/65 font-dm-sans'}>
                Aún no hay leads para resumir.
              </p>
            )}
          </div>

          <div
            className={
              'absolute top-4 right-4 z-20 flex items-center gap-4 rounded-full bg-white/95 px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm'
            }
          >
            <span
              className={
                'flex items-center gap-2 text-[11px] font-dm-sans text-[#2D5A3D]'
              }
            >
              <span className={'size-2 rounded-full bg-[#2D5A3D]'} />
              Alta actividad
            </span>
            <span
              className={
                'flex items-center gap-2 text-[11px] font-dm-sans text-[#9BB79E]'
              }
            >
              <span className={'size-2 rounded-full bg-[#B8D4BE]'} />
              Emergente
            </span>
          </div>

          <div
            className={
              'absolute bottom-4 right-4 z-20 w-[min(16rem,calc(100%-2rem))] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]'
            }
          >
            <div
              className={
                'mb-2 text-[11px] uppercase tracking-[0.2em] text-white/55 font-dm-sans'
              }
            >
              País / Usuarios
            </div>

            <div className={'space-y-1.5'}>
              {countryRanking.length === 0 ? (
                <p className={'text-sm text-white/60 font-dm-sans'}>
                  Sin datos todavía.
                </p>
              ) : (
                countryRanking.map((item) => (
                  <div
                    key={item.label}
                    className={'grid grid-cols-[1fr_auto] items-center gap-3'}
                  >
                    <div className={'min-w-0'}>
                      <div
                        className={'truncate text-sm font-medium text-white'}
                      >
                        {item.label}
                      </div>
                    </div>
                    <div className={'text-sm font-medium text-white/80'}>
                      {item.leads}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedMarker && (
            <div
              className={
                'absolute bottom-4 left-4 z-20 max-w-70 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]'
              }
            >
              <div className={'flex items-start justify-between gap-3'}>
                <div>
                  <p
                    className={
                      'font-dm-sans text-[11px] uppercase tracking-[0.2em] text-white/55'
                    }
                  >
                    Ubicación seleccionada
                  </p>
                  <h3
                    className={
                      'mt-1 font-cormorant text-[20px] leading-tight font-semibold text-white'
                    }
                  >
                    {selectedMarker.city || selectedMarker.label}
                  </h3>
                  <p className={'mt-1 text-sm text-white/75 font-dm-sans'}>
                    {selectedMarker.region ? `${selectedMarker.region} · ` : ''}
                    {selectedMarker.country || selectedMarker.label}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetMapView}
                  className={
                    'rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] font-dm-sans text-white/80 backdrop-blur-sm transition hover:bg-black/30'
                  }
                >
                  Ver todo
                </button>
              </div>
              <div
                className={
                  'mt-3 flex items-center justify-between text-sm font-dm-sans'
                }
              >
                <span className={'text-white/65'}>Leads</span>
                <span className={'font-semibold text-white'}>
                  {selectedMarker.leads}
                </span>
              </div>
            </div>
          )}

          <div
            className={
              'absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(88,129,87,0.16),transparent_22%),radial-gradient(circle_at_72%_48%,rgba(96,165,250,0.1),transparent_20%),linear-gradient(180deg,rgba(17,24,39,0.98),rgba(11,15,20,1))]'
            }
          />

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: mapZoom, center: mapCenter }}
            className={'absolute inset-0 h-full w-full'}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={countries110m}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1A202A"
                    stroke="#3A4556"
                    strokeWidth={0.45}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#283242' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {markers.map((marker) => {
              const isStrong = marker.leads > 1;

              return (
                <Marker
                  key={marker.label}
                  coordinates={[marker.lon, marker.lat]}
                  onClick={() => handleMarkerClick(marker)}
                >
                  <g style={{ cursor: 'pointer' }}>
                    <g transform="translate(16,-22)">
                      <line
                        x1={-8}
                        y1={16}
                        x2={-1}
                        y2={8}
                        stroke="rgba(244, 247, 243, 0.24)"
                        strokeWidth={1}
                        strokeLinecap="round"
                      />
                      <rect
                        x={-6}
                        y={-16}
                        rx={16}
                        ry={16}
                        width={Math.max(68, marker.label.length * 6.1)}
                        height={22}
                        fill="rgba(7, 11, 15, 0.78)"
                        stroke="rgba(219, 229, 222, 0.16)"
                        strokeWidth={0.7}
                      />
                      <text
                        x={6}
                        y={-3}
                        fill="#F8FBF8"
                        fontSize={9.5}
                        fontWeight={700}
                        letterSpacing="0.01em"
                        fontFamily="var(--font-dm-sans)"
                      >
                        {marker.label}
                      </text>
                    </g>
                    <circle
                      r={8}
                      fill="#9BB79E"
                      fillOpacity={0.1}
                      className={'animate-ping motion-reduce:animate-none'}
                    />
                    <circle
                      r={3.1}
                      fill={isStrong ? '#E3EEE1' : '#C0D0C4'}
                      stroke="#F2F6F1"
                      strokeWidth={1}
                    />
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>

          <div
            className={
              'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,15,20,0.06)_68%,rgba(11,15,20,0.24)_100%)]'
            }
          />

          {!hasRegions && (
            <div
              className={'absolute inset-0 flex items-center justify-center'}
            >
              <div
                className={
                  'rounded-full bg-white/8 px-4 py-2 text-xs font-dm-sans text-white/80 shadow-sm backdrop-blur-sm'
                }
              >
                El mapa se activará cuando existan leads con ubicación
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
