import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { CounterControl } from '../components/CounterControl';
import { ResolutionSelector } from '../components/ResolutionSelector';
import { CarbonCloud } from '../components/CarbonCloud';
import { CumulativeStatus } from '../components/CumulativeStatus';
import { NavigationControls } from '../components/NavigationControls';

export const Page4Iteration: React.FC = () => {
  const {
    ideation,
    iteration,
    ideationCarbon,
    iterationCarbon,
    refinementCarbon,
    totalImageCount,
    totalCarbon,
    estimateType,
    selectedModel,
    updateStageCount,
    updateStageResolution,
    goNext,
    goBack
  } = useWorkflow();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 py-2">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          Stage 2: Iteration
        </h2>
        <p className="text-sm text-neutral-600">
          Prompt refinement, visual variations, style testing, regeneration.
        </p>
      </div>

      {/* Two Column Desktop Layout / Stacked Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Input */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-900">
              How many times did you regenerate or iterate?
            </label>

            <CounterControl
              value={iteration.count}
              onChange={(count) => updateStageCount('iteration', count)}
              labelSingular="regeneration"
              labelPlural="regenerations"
            />
          </div>

          <ResolutionSelector
            value={iteration.resolution}
            onChange={(res) => updateStageResolution('iteration', res)}
          />

          <p className="text-xs text-neutral-500 italic bg-stone-50 p-3 rounded-xl border border-stone-100">
            Repeated regeneration can turn small per-image impacts into a larger workflow-level footprint.
          </p>
        </div>

        {/* Right Column: Live Carbon Cloud */}
        <div className="lg:col-span-6">
          <CarbonCloud
            stage="iteration"
            ideationCount={ideation.count}
            ideationCarbon={ideationCarbon}
            ideationResolution={ideation.resolution}
            iterationCount={iteration.count}
            iterationCarbon={iterationCarbon}
            iterationResolution={iteration.resolution}
            refinementCount={0}
            refinementCarbon={0}
            totalCarbon={ideationCarbon + iterationCarbon}
            totalImageCount={ideation.count + iteration.count}
            estimateType={estimateType}
            selectedModelName={selectedModel}
          />
        </div>
      </div>

      {/* Bottom Cumulative Status */}
      <div className="pt-2">
        <CumulativeStatus imageCount={ideation.count + iteration.count} totalCarbon={ideationCarbon + iterationCarbon} />
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Next: Refinement"
        onNext={goNext}
      />
    </div>
  );
};
