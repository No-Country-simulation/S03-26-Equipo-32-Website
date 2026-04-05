import React from 'react';
import type { ScoreItem } from '@/components/pages/leads-manager/model/scoringRulesData.ts';

interface ScoreSectionProps {
  title: string;
  items: ScoreItem[];
}

export const ScoreSection = ({ title, items }: ScoreSectionProps) => (
  <div className="mt-4 text-sm">
    <div className="uppercase text-[#A8A29E] font-semibold">{title}</div>
    <div className="border-b border-[#F6F3EF] my-2" />
    <div className="grid grid-cols-2 gap-1">
      {items.map(({ label, points }) => (
        <React.Fragment key={label}>
          <div className="text-[#6B7280]">{label}</div>
          <div className="ms-auto text-[#162C14]">{points}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
);
