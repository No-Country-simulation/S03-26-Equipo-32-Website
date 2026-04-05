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

export function calculateScore(lead: Lead): number {
  let score = 0;

  score += VOLUME_SCORE[lead.volumePurchase] ?? 0;
  score += BUSINESS_SCORE[lead.businessType] ?? 10;

  return Math.min(score, 100);
}

export function getPriority(score: number): 'alta' | 'media' | 'baja' {
  if (score >= 70) return 'alta';
  if (score >= 40) return 'media';
  return 'baja';
}

export function isUrgent(lead: Lead): boolean {
  const daysSince = (Date.now() - lead.createdAt) / 86_400_000;
  return daysSince <= 7 && !lead.contactedAt;
}
