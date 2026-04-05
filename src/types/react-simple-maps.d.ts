declare module 'react-simple-maps' {
  import type { ReactNode } from 'react';

  export type GeographyFeature = {
    rsmKey: string;
  };

  export type GeographiesRenderProps = {
    geographies: GeographyFeature[];
  };

  export type ComposableMapProps = {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    className?: string;
    style?: Record<string, string | number>;
    children?: ReactNode;
  };

  export type GeographiesProps = {
    geography: unknown;
    children: (props: GeographiesRenderProps) => ReactNode;
  };

  export type GeographyProps = {
    geography: GeographyFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: Record<string, Record<string, string | number | undefined>>;
  };

  export type MarkerProps = {
    coordinates: [number, number];
    children?: ReactNode;
    onClick?: () => void;
  };

  export const ComposableMap: (props: ComposableMapProps) => ReactNode;
  export const Geographies: (props: GeographiesProps) => ReactNode;
  export const Geography: (props: GeographyProps) => ReactNode;
  export const Marker: (props: MarkerProps) => ReactNode;
}
