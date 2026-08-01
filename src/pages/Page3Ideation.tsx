import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { CounterControl } from '../components/CounterControl';
import { ResolutionSelector } from '../components/ResolutionSelector';
import { CarbonCloud } from '../components/CarbonCloud';
import { CumulativeStatus } from '../components/CumulativeStatus';
import { NavigationControls } from '../components/NavigationControls';

export const Page3Ideation: React.FC = () => {
  const {
    ideation,
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
          Stage 1: Ideation
        </h2>
        <p className="text-sm text-neutral-600">
          Early brainstorming, sketches, moodboards, visual directions.
        </p>
      </div>

      {/* Two Column Desktop Layout / Stacked Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Input */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-900">
              How many images did you generate for ideation?
            </label>

            <CounterControl
              value={ideation.count}
              onChange={(count) => updateStageCount('ideation', count)}
              labelSingular="image"
              labelPlural="images"
            />
          </div>

          <ResolutionSelector
            value={ideation.resolution}
            onChange={(res) => updateStageResolution('ideation', res)}
          />
        </div>

        {/* Right Column: Live Carbon Cloud */}
        <div className="lg:col-span-6">
          <CarbonCloud
            stage="ideation"
            ideationCount={ideation.count}
            ideationCarbon={ideationCarbon}
            ideationResolution={ideation.resolution}
            iterationCount={0}
            iterationCarbon={0}
            refinementCount={0}
            refinementCarbon={0}
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
        nextLabel="Next: Iteration"
        onNext={goNext}
      />
    </div>
  );
};
