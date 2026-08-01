import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { formatCarbon } from '../utils/calculations';
import { NavigationControls } from '../components/NavigationControls';
import { Layers, Lightbulb, Activity, Flag } from 'lucide-react';

export const Page6Accumulation: React.FC = () => {
  const {
    ideation,
    iteration,
    refinement,
    totalImageCount,
    totalCarbon,
    goNext,
    goBack
  } = useWorkflow();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-2">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          Small generations add up.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Your footprint was not created by one final image, but by a sequence of generated and regenerated images across your workflow.
        </p>
      </div>

      {/* MODULE 1: ACCUMULATION SUMMARY CARD */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center space-x-2 text-neutral-900 font-semibold text-lg">
            <Layers className="w-5 h-5 text-emerald-800" />
            <span>Workflow Accumulation Summary</span>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1 rounded-full border border-stone-200">
            Total Images: {totalImageCount}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-neutral-500 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-stone-600" />
              <span>Ideation</span>
            </div>
            <p className="text-lg font-bold text-neutral-900">{ideation.count} <span className="text-xs font-normal text-neutral-500">images</span></p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-neutral-500 font-medium">
              <Activity className="w-3.5 h-3.5 text-stone-600" />
              <span>Iteration</span>
            </div>
            <p className="text-lg font-bold text-neutral-900">{iteration.count} <span className="text-xs font-normal text-neutral-500">regenerations</span></p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-neutral-500 font-medium">
              <Flag className="w-3.5 h-3.5 text-stone-600" />
              <span>Refinement</span>
            </div>
            <p className="text-lg font-bold text-neutral-900">{refinement.count} <span className="text-xs font-normal text-neutral-500">final images</span></p>
          </div>
        </div>

        <div className="p-4 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
          <span className="text-sm font-medium">Estimated total footprint</span>
          <span className="font-mono text-xl font-bold text-emerald-400">{formatCarbon(totalCarbon)}</span>
        </div>
      </div>

      {/* MODULE 2: CORE EXPLANATION */}
      <div className="p-6 bg-stone-100/80 border border-stone-200/80 rounded-2xl text-stone-800 text-base sm:text-lg font-sans font-bold leading-relaxed">
        “Each image may feel like a small action, but repeated generation turns these small actions into a cumulative footprint.”
      </div>

      {/* MODULE 3: THE HIDDEN PROCESS */}
      <div className="p-5 bg-white border border-neutral-200/80 rounded-2xl text-sm text-neutral-600 leading-relaxed shadow-2xs">
        In most AI image tools, this process appears only as a loading bar or a new image result. The energy use behind each generation is usually invisible.
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Understand my workflow pattern"
        onNext={goNext}
      />
    </div>
  );
};
