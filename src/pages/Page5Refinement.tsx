import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { CounterControl } from '../components/CounterControl';
import { ResolutionSelector } from '../components/ResolutionSelector';
import { CarbonCloud } from '../components/CarbonCloud';
import { CumulativeStatus } from '../components/CumulativeStatus';
import { NavigationControls } from '../components/NavigationControls';

export const Page5Refinement: React.FC = () => {
  const {
    ideation,
    iteration,
    refinement,
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
          Stage 3: Refinement
        </h2>
        <p className="text-sm text-neutral-600">
          Final adjustments, polished outputs, detailed visual refinement.
        </p>
      </div>

      {/* Two Column Desktop Layout / Stacked Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Input */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-900">
              How many final or near-final images did you generate?
            </label>

            <CounterControl
              value={refinement.count}
              onChange={(count) => updateStageCount('refinement', count)}
              labelSingular="image"
              labelPlural="images"
            />
          </div>

          <ResolutionSelector
            value={refinement.resolution}
            onChange={(res) => updateStageResolution('refinement', res)}
          />
        </div>

        {/* Right Column: Live Carbon Cloud */}
        <div className="lg:col-span-6">
          <CarbonCloud
            stage="refinement"
            ideationCount={ideation.count}
            ideationCarbon={ideationCarbon}
            ideationResolution={ideation.resolution}
            iterationCount={iteration.count}
            iterationCarbon={iterationCarbon}
            iterationResolution={iteration.resolution}
            refinementCount={refinement.count}
            refinementCarbon={refinementCarbon}
            refinementResolution={refinement.resolution}
            totalCarbon={totalCarbon}
            totalImageCount={totalImageCount}
            estimateType={estimateType}
            selectedModelName={selectedModel}
          />
        </div>
      </div>

      {/* Bottom Cumulative Status */}
      <div className="pt-2">
        <CumulativeStatus imageCount={totalImageCount} totalCarbon={totalCarbon} />
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Reflect on this workflow"
        onNext={goNext}
      />
    </div>
  );
};
