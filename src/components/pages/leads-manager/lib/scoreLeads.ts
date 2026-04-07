import type { Lead } from '@/core/leads/entities/lead.entity.ts';

const VOLUME_SCORE: Record<string, number> = {
  A: 10,
  B: 15,
  C: 30,
  D: 40,
};

const BUSINESS_SCORE: Record<string, number> = {
  WHOLESALER: 40,
  STORE_CORPORATE_GIFT: 30,
  BOUTIQUE: 20,
  STORE_GIFTS: 25,
  OTHER: 10,
};

const NEEDED_BY_SCORE: Record<string, number> = {
  A: 15,
  B: 8,
  C: 3,
};

export function calculateScore(lead: Lead): number {
  let score = 0;

  score += VOLUME_SCORE[lead.volumePurchase] ?? 0;
  score += BUSINESS_SCORE[lead.businessType] ?? 10;
  score += NEEDED_BY_SCORE[lead.neededBy] ?? 0;

  return Math.min(score, 100);
}

export function getPriority(score: number): 'alta' | 'media' | 'baja' {
  if (score >= 70) return 'alta';
  if (score >= 45) return 'media';
  return 'baja';
}

export function getUrgency(lead: Lead): 'alto' | 'medio' | 'bajo' {
  if (lead.neededBy === 'A') return 'alto';
  if (lead.neededBy === 'B') return 'medio';
  return 'bajo';
}
