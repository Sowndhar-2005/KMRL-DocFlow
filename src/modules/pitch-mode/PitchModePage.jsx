import React from 'react';
import { ScenarioBar } from './components/ScenarioBar';
import { ImpactCards } from './components/ImpactCards';

export function PitchModePage({
  onRunScenario1,
  onRunScenario2,
  onRunScenario3,
  onRunScenario4,
  onResetDb
}) {
  return (
    <div>
      <ScenarioBar
        onRunScenario1={onRunScenario1}
        onRunScenario2={onRunScenario2}
        onRunScenario3={onRunScenario3}
        onRunScenario4={onRunScenario4}
        onResetDb={onResetDb}
      />
      <ImpactCards />
    </div>
  );
}
