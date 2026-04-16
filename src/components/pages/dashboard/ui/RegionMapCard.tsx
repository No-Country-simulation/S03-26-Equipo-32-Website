import { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
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
  cityBreakdown: Array<{
    city: string;
    leads: number;
  }>;
};

type CountryRankItem = {
  label: string;
  leads: number;
  percent: number;
};

type PointResolution = {
  lat: number;
  lon: number;
  isPrecise: boolean;
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

const getCountryPoint = (region: LeadsRegionItem): PointResolution => {
  if (
    typeof region.latitude === 'number' &&
    Number.isFinite(region.latitude) &&
    typeof region.longitude === 'number' &&
    Number.isFinite(region.longitude)
  ) {
    return {
      lat: region.latitude,
      lon: region.longitude,
      isPrecise: true,
    };
  }

  const lookupKeys = [
    normalizeText(region.countryCode),
    normalizeText(region.country),
    normalizeText(region.label),
  ].filter(Boolean);

  for (const key of lookupKeys) {
    if (countryGeoPoints[key]) {
      return { ...countryGeoPoints[key], isPrecise: false };
    }
  }

  for (const key of Object.keys(countryGeoPoints)) {
    if (lookupKeys.some((value) => value.includes(key))) {
      return { ...countryGeoPoints[key], isPrecise: false };
    }
  }

  const fallbackLat = (hashString(region.label) % 120) / 2 - 30;
  const fallbackLon = (hashString(`${region.label}:lon`) % 260) / 2 - 65;

  return { lat: fallbackLat, lon: fallbackLon, isPrecise: false };
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
    const cityMap = new Map<
      string,
      {
        leads: number;
        preciseRegions: LeadsRegionItem[];
      }
    >();

    group.regions.forEach((region) => {
      const cityLabel =
        region.city?.trim() || region.region?.trim() || 'Sin ciudad';
      const current = cityMap.get(cityLabel) ?? {
        leads: 0,
        preciseRegions: [],
      };

      current.leads += region.leads;

      if (
        typeof region.latitude === 'number' &&
        Number.isFinite(region.latitude) &&
        typeof region.longitude === 'number' &&
        Number.isFinite(region.longitude)
      ) {
        current.preciseRegions.push(region);
      }

      cityMap.set(cityLabel, current);
    });

    const cityBreakdown = [...cityMap.entries()]
      .map(([city, value]) => ({ city, leads: value.leads }))
      .sort((left, right) => right.leads - left.leads)
      .slice(0, 6);

    const dominantCity = cityBreakdown[0]?.city;
    const dominantCityRegions = dominantCity
      ? (cityMap.get(dominantCity)?.preciseRegions ?? [])
      : [];

    const preciseRegions = group.regions.filter(
      (region) =>
        typeof region.latitude === 'number' &&
        Number.isFinite(region.latitude) &&
        typeof region.longitude === 'number' &&
        Number.isFinite(region.longitude),
    );

    const point =
      dominantCityRegions.length > 0
        ? {
            lat:
              dominantCityRegions.reduce(
                (acc, region) =>
                  acc + (region.latitude as number) * region.leads,
                0,
              ) /
              dominantCityRegions.reduce(
                (acc, region) => acc + region.leads,
                0,
              ),
            lon:
              dominantCityRegions.reduce(
                (acc, region) =>
                  acc + (region.longitude as number) * region.leads,
                0,
              ) /
              dominantCityRegions.reduce(
                (acc, region) => acc + region.leads,
                0,
              ),
            isPrecise: true,
          }
        : preciseRegions.length > 0
          ? {
              lat:
                preciseRegions.reduce(
                  (acc, region) => acc + (region.latitude as number),
                  0,
                ) / preciseRegions.length,
              lon:
                preciseRegions.reduce(
                  (acc, region) => acc + (region.longitude as number),
                  0,
                ) / preciseRegions.length,
              isPrecise: true,
            }
          : getCountryPoint(
              representative ?? ({ label: group.label } as LeadsRegionItem),
            );
    const seed = hashString(`${group.label}:${group.leads}:${index}`);
    const primaryCity = dominantCity ?? '';
    const primaryRegion =
      group.regions
        .find(
          (region) =>
            (region.city?.trim() || region.region?.trim() || 'Sin ciudad') ===
            dominantCity,
        )
        ?.region?.trim() ?? '';

    const jitterLon = point.isPrecise ? 0 : ((seed % 7) - 3) * 1.2;
    const jitterLat = point.isPrecise ? 0 : (((seed >> 3) % 7) - 3) * 0.8;

    return {
      label: group.label,
      leads: group.leads,
      groupSize: group.regions.length,
      country: representative?.country || group.label,
      region: primaryRegion,
      city: primaryCity,
      cityBreakdown,
      lon: Math.min(165, Math.max(-165, point.lon + jitterLon)),
      lat: Math.min(70, Math.max(-45, point.lat + jitterLat)),
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
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 16]);

  const countryLeadsMap = useMemo(() => {
    const map = new Map<string, number>();
    markers.forEach((marker) => {
      map.set(normalizeText(marker.label), marker.leads);
      if (marker.country) map.set(normalizeText(marker.country), marker.leads);
    });
    return map;
  }, [markers]);

  const getGeoFill = (geoName: string): string => {
    const leads = countryLeadsMap.get(normalizeText(geoName)) ?? 0;
    if (leads === 0) return '#B8D4BE';
    if (leads <= 2) return '#6B9E7A';
    return '#2D5A3D';
  };

  const resetMapView = () => {
    setSelectedMarker(null);
    setMapZoom(1);
    setMapCenter([0, 16]);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setMapZoom(2.4);
    setMapCenter([marker.lon, marker.lat]);
  };

  const handleMapMoveEnd = ({
    coordinates,
    zoom,
  }: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    setMapCenter(coordinates);
    setMapZoom(zoom);
  };

  return (
    <section
      className={
        'overflow-hidden rounded-[18px] border border-[#EFE7DE] bg-[#E9E5DE] shadow-[0_20px_40px_rgba(40,30,20,0.08)]'
      }
    >
      <div className={'px-6 pt-5 pb-3'}>
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

      {/* ── Mobile: info fuera del mapa ── */}
      <div className={'sm:hidden px-6 pb-3'}>
        <div className={'flex flex-col gap-3'}>
          {/* Top country */}
          <div>
            <p
              className={
                'font-dm-sans text-[11px] uppercase tracking-[0.2em] text-[#8B8176]'
              }
            >
              País con más leads
            </p>
            {topCountry ? (
              <div className={'mt-1'}>
                <div
                  className={
                    'font-cormorant text-[28px] leading-none font-semibold text-[#3B2F24]'
                  }
                >
                  {topCountry.label}
                </div>
                <p
                  className={
                    'font-dm-sans text-[13px] text-[#8B8176] mt-1 tracking-wide'
                  }
                >
                  {topCountry.leads} leads · {topCountry.percent}% del total
                </p>
              </div>
            ) : (
              <p className={'font-dm-sans text-sm text-[#8B8176] mt-1'}>
                Sin datos.
              </p>
            )}
          </div>
          {/* Separador */}
          <div className={'h-px bg-[#D5CEC7]/50'} />
          {/* Ranking con barra */}
          <div>
            <p
              className={
                'font-dm-sans text-[11px] uppercase tracking-[0.2em] text-[#8B8176] mb-2'
              }
            >
              País / Usuarios
            </p>
            <div className={'space-y-2'}>
              {countryRanking.map((item) => (
                <div
                  key={item.label}
                  className={
                    'grid grid-cols-[1fr_minmax(0,80px)_auto] items-center gap-3'
                  }
                >
                  <span className={'font-dm-sans text-sm text-[#3B2F24]'}>
                    {item.label}
                  </span>
                  <div
                    className={
                      'h-1 rounded-full bg-[#D5CEC7]/70 overflow-hidden'
                    }
                  >
                    <div
                      style={{ width: `${item.percent}%` }}
                      className={'h-full bg-[#6B5E54] rounded-full'}
                    />
                  </div>
                  <span
                    className={
                      'font-dm-sans text-sm font-semibold text-[#3B2F24] tabular-nums'
                    }
                  >
                    {item.leads}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* eliminado – el rounded del mapa ya separa visualmente */}

      <div className={'px-4 pb-4 sm:px-6 sm:pb-6'}>
        <div
          className={
            'relative h-65 sm:h-96 overflow-hidden rounded-[14px] border border-[#B8D4BE] bg-[#F0F4EF] lg:h-136'
          }
        >
          {/* Desktop-only: top country overlay */}
          <div
            className={'hidden sm:block absolute top-5 left-5 z-20 max-w-60'}
          >
            <p
              className={
                'font-dm-sans text-[11px] uppercase tracking-[0.2em] text-[#6B9E7A]'
              }
            >
              País con más leads
            </p>
            {topCountry ? (
              <div className={'mt-1'}>
                <div
                  className={
                    'text-[22px] leading-tight font-semibold text-[#162C14] truncate'
                  }
                >
                  {topCountry.label}
                </div>
                <p className={'mt-1 text-sm text-[#2D5A3D]/80 font-dm-sans'}>
                  {topCountry.leads} leads · {topCountry.percent}% del total
                </p>
              </div>
            ) : (
              <p className={'mt-1 text-sm text-[#6B9E7A] font-dm-sans'}>
                Aún no hay leads para resumir.
              </p>
            )}
          </div>

          {/* Desktop-only: ranking overlay */}
          <div
            className={
              'hidden sm:block absolute bottom-5 right-5 z-20 w-[min(16rem,calc(100%-2.5rem))] rounded-xl bg-[#2D5A3D]/80 px-4 py-3 backdrop-blur-sm'
            }
          >
            <div
              className={
                'mb-2 text-[11px] uppercase tracking-[0.2em] text-[#F0F4EF]/70 font-dm-sans'
              }
            >
              País / Usuarios
            </div>
            <div className={'space-y-1.5'}>
              {countryRanking.length === 0 ? (
                <p className={'text-sm text-[#F0F4EF]/60 font-dm-sans'}>
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
                        className={
                          'truncate text-sm font-medium text-[#F0F4EF]'
                        }
                      >
                        {item.label}
                      </div>
                    </div>
                    <div className={'text-sm font-medium text-[#F0F4EF]/80'}>
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
                'absolute bottom-3 left-3 z-20 w-[min(24rem,calc(100%-1.5rem))] rounded-xl border border-[#6C7A92]/28 bg-[linear-gradient(145deg,rgba(10,18,30,0.85),rgba(8,14,24,0.75))] p-3 sm:p-4 text-white shadow-[0_16px_34px_rgba(0,0,0,0.36)] backdrop-blur-md'
              }
            >
              <div className={'flex items-center justify-between gap-3'}>
                <div className={'min-w-0'}>
                  <h3
                    className={
                      'font-dm-sans text-base sm:text-[24px] leading-tight font-semibold text-white truncate'
                    }
                  >
                    {selectedMarker.country || selectedMarker.label}
                  </h3>
                  <p
                    className={'text-xs sm:text-sm text-white/70 font-dm-sans'}
                  >
                    {selectedMarker.leads} leads
                    {selectedMarker.city ? ` · ${selectedMarker.city}` : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetMapView}
                  className={
                    'shrink-0 rounded-full border border-[#7D8CA3]/34 bg-[#0A1422]/45 px-3 py-1 text-[11px] font-dm-sans text-white/80 transition hover:bg-[#0D1A2C]/60'
                  }
                >
                  ✕
                </button>
              </div>

              <div
                className={
                  'hidden sm:grid grid-cols-[1fr_auto] items-center mt-4 border-y border-[#6C7A92]/25 py-2 text-sm font-dm-sans'
                }
              >
                <span className={'text-white/65'}>Leads</span>
                <span className={'font-semibold text-white'}>
                  {selectedMarker.leads}
                </span>
              </div>

              <div className={'hidden sm:block mt-3 space-y-1.5'}>
                <p
                  className={
                    'font-dm-sans text-[10px] uppercase tracking-[0.24em] text-white/55'
                  }
                >
                  Ciudades
                </p>
                <div className={'space-y-1'}>
                  {selectedMarker.cityBreakdown.length > 0 ? (
                    selectedMarker.cityBreakdown.map((item) => (
                      <div
                        key={`${selectedMarker.label}:${item.city}`}
                        className={
                          'grid grid-cols-[1fr_auto] items-center gap-3 rounded-md px-2 py-1 text-sm font-dm-sans hover:bg-[#112136]/42'
                        }
                      >
                        <span className={'truncate text-white/80'}>
                          {item.city}
                        </span>
                        <span className={'font-semibold text-white'}>
                          {item.leads}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className={'text-sm font-dm-sans text-white/60'}>
                      Sin detalle por ciudad
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 175 }}
            className={'absolute inset-0 h-full w-full'}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup
              center={mapCenter}
              zoom={mapZoom}
              minZoom={1}
              maxZoom={8}
              onMoveEnd={handleMapMoveEnd}
            >
              <Geographies geography={countries110m as never}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const fill = getGeoFill(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ((geo as any).properties as { name?: string })?.name ??
                        '',
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="#F0F4EF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none', fill: '#6B9E7A' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {markers.map((marker) => {
                const isStrong = marker.leads > 1;
                const markerVisualScale = 1 / mapZoom;

                return (
                  <Marker
                    key={marker.label}
                    coordinates={[marker.lon, marker.lat]}
                    onClick={() => handleMarkerClick(marker)}
                  >
                    <g
                      style={{ cursor: 'pointer' }}
                      transform={`scale(${markerVisualScale})`}
                    >
                      <g transform="translate(16,-22)">
                        <line
                          x1={-8}
                          y1={16}
                          x2={-1}
                          y2={8}
                          stroke="rgba(22, 44, 20, 0.35)"
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
                          fill="rgba(107, 114, 128, 0.9)"
                          stroke="rgba(107, 114, 128, 0.4)"
                          strokeWidth={0.7}
                        />
                        <text
                          x={6}
                          y={-3}
                          fill="#FFFFFF"
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
                        fill="#2D5A3D"
                        fillOpacity={0.18}
                        className={'animate-ping motion-reduce:animate-none'}
                      />
                      <circle
                        r={3.1}
                        fill={isStrong ? '#162C14' : '#2D5A3D'}
                        stroke="#F0F4EF"
                        strokeWidth={1}
                      />
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {!hasRegions && (
            <div
              className={'absolute inset-0 flex items-center justify-center'}
            >
              <div
                className={
                  'rounded-full bg-[#2D5A3D]/70 px-4 py-2 text-xs font-dm-sans text-[#F0F4EF] shadow-sm backdrop-blur-sm'
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
