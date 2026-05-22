'use client';
import { useState } from 'react';
import CountryCard from './CountryCard';
import MobilityModal from './MobilityModal';
import type { MobilityPhase } from '@/types';

export default function MobilityCards({ phases }: { phases: MobilityPhase[] }) {
  const [selected, setSelected] = useState<MobilityPhase | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {phases.map(phase => (
          <div key={phase.id} id={phase.id}>
            <CountryCard phase={phase} onExplore={() => setSelected(phase)} />
          </div>
        ))}
      </div>

      {selected && (
        <MobilityModal phase={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
