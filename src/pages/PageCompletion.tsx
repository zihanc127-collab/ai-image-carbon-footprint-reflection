import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { formatCarbon } from '../utils/calculations';
import { Heart, RotateCcw, CheckCircle2, Feather, Sparkles } from 'lucide-react';

export const PageCompletion: React.FC = () => {
  const {
    totalImageCount,
    totalCarbon,
    selectedTakeaways,
    resetWorkflow
  } = useWorkflow();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700 py-6 text-center">
      {/* Thank you badge & Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono uppercase tracking-wider font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Reflection Complete</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight leading-tight">
          Thank you for reflecting on your AI image generation workflow.
        </h1>

        <p className="text-base text-neutral-600 max-w-lg mx-auto">
          Mindful awareness transforms creative habits. By pausing to consider the hidden process behind repeated generation, you bring intention to digital creation.
        </p>
      </div>

      {/* Summary Recap Box */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-sm space-y-4 text-left max-w-xl mx-auto">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
            <Feather className="w-4 h-4 text-stone-600" />
            <span>Workflow Footprint Summary</span>
          </span>
          <span className="text-xs text-neutral-500 font-mono">{totalImageCount} images</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-neutral-700">Estimated Total Footprint</span>
          <span className="font-mono text-lg font-bold text-emerald-800">{formatCarbon(totalCarbon)}</span>
        </div>

        {selectedTakeaways.length > 0 && (
          <div className="pt-3 border-t border-neutral-100 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Your Primary Intentions
            </span>
            <ul className="space-y-1.5">
              {selectedTakeaways.map((takeaway, idx) => (
                <li key={idx} className="text-xs text-neutral-700 flex items-start space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Secondary Button: Start again */}
      <div className="pt-6">
        <button
          type="button"
          onClick={resetWorkflow}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 text-sm font-medium transition-all shadow-2xs hover:shadow focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          <RotateCcw className="w-4 h-4 text-neutral-600" />
          <span>Start again</span>
        </button>
      </div>
    </div>
  );
};
