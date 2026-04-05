import { ScoreSection } from '@/components/pages/leads-manager/ui/ScoreSection.tsx';
import {
  businessTypes,
  scoringThresholds,
  urgencyItems,
  volumeItems,
} from '@/components/pages/leads-manager/model/scoringRulesData.ts';

export const ScoringRules = () => {
  return (
    <div className="p-4 bg-white rounded-lg mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 font-dm-sans">
      <div>
        <h2 className="text-2xl text-[#162C14] font-semibold font-cormorant mb-2">
          Reglas de scoring
        </h2>
        <p className="mb-4 text-sm text-[#78716C]">
          Criterios de calificación de leads
        </p>
        <ul className="list-disc list-inside text-gray-700 text-xs">
          {scoringThresholds.map(({ range, color, label }) => (
            <li key={range} className="grid grid-cols-3 gap-1 text-[11px]">
              <div style={{ color }}>{range}</div>
              <div className="text-[#78716C] mx-auto">→</div>
              <div className="text-[#78716C]">{label}</div>
            </li>
          ))}
        </ul>
      </div>

      <ScoreSection title="Tipo de negocio" items={businessTypes} />
      <ScoreSection title="Volumen de compra" items={volumeItems} />
      <ScoreSection title="Urgencia" items={urgencyItems} />
    </div>
  );
};
