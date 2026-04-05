import { VOLUME_PURCHASE } from '@/components/share/constants.ts';

export interface ScoreItem {
  label: string;
  points: string;
}

export const businessTypes: ScoreItem[] = [
  { label: 'Distribuidor', points: '+40 pts' },
  { label: 'Regalos corporativos', points: '+30 pts' },
  { label: 'Tienda de regalos', points: '+25 pts' },
  { label: 'Boutique/Tienda de acc.', points: '+20 pts' },
  { label: 'Otro', points: '+10 pts' },
];

export const volumeItems: ScoreItem[] = [
  { label: VOLUME_PURCHASE.D, points: '+40 pts' },
  { label: VOLUME_PURCHASE.C, points: '+30 pts' },
  { label: VOLUME_PURCHASE.B, points: '+20 pts' },
  { label: VOLUME_PURCHASE.A, points: '+10 pts' },
];

export const urgencyItems: ScoreItem[] = [
  { label: 'Alta', points: '+15 pts' },
  { label: 'Media', points: '+8 pts' },
  { label: 'Baja', points: '+3 pts' },
];

export const scoringThresholds = [
  { range: '70-95 pts', color: '#2D5A3D', label: 'Alta prioridad' },
  { range: '45-69 pts', color: '#4A7C59', label: 'Potencial medio' },
  { range: '< 45 pts', color: '#616161', label: 'Bajo potencial' },
];
