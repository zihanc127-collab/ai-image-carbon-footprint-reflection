import React, { useState } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { ReflectionOption } from '../components/ReflectionOption';
import { NavigationControls } from '../components/NavigationControls';
import { Sparkles, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Page8NextTime: React.FC = () => {
  const {
    selectedTakeaways,
    toggleTakeaway,
    goNext,
    goBack
  } = useWorkflow();

  const [inlineNotice, setInlineNotice] = useState<string | null>(null);

  const reflectionCards = [
    {
      stage: 'Before generating',
      question: 'What am I trying to explore, and how many directions do I really need?'
    },
    {
      stage: 'During iteration',
      question: 'Am I regenerating because I am learning something new, or because I am stuck in trial-and-error?'
    },
    {
      stage: 'Before final output',
      question: 'Which images are worth generating at higher resolution?'
    }
  ];

  const takeawayOptions = [
    'Every generated image has a footprint.',
    'Repeated regeneration accumulates over time.',
    'Discarded drafts are still part of the footprint.',
    'Lower-resolution drafts may be useful during early exploration.',
    'The exact model behind a tool is often hidden.',
    'I want to notice my generation process more carefully.'
  ];

  const handleTakeawayToggle = (opt: string) => {
    const res = toggleTakeaway(opt);
    if (!res.success && res.message) {
      setInlineNotice(res.message);
    } else {
      setInlineNotice(null);
    }
  };

  const isNextDisabled = selectedTakeaways.length === 0;

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 py-2">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          What will you notice next time?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600">
          Mindful creative prompts for future AI image generation workflows.
        </p>
      </div>

      {/* MODULE 1: FUTURE REFLECTION PROMPTS */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-800" />
          <span>Reflective Prompts for Mindful Creation</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reflectionCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="text-xs font-mono font-semibold uppercase text-emerald-800 tracking-wide bg-emerald-50 px-2.5 py-1 rounded-md w-fit">
                {card.stage}
              </div>
              <p className="text-sm font-sans text-neutral-800 leading-relaxed pt-2">
                “{card.question}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODULE 2: TAKEAWAY SELECTION */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
            Select up to two items you most want to keep in mind right now.
          </h3>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full shrink-0 ml-2">
            Max 2
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {takeawayOptions.map((opt) => (
            <ReflectionOption
              key={opt}
              label={opt}
              isSelected={selectedTakeaways.includes(opt)}
              onToggle={() => handleTakeawayToggle(opt)}
            />
          ))}
        </div>

        {/* Inline limit notice */}
        {inlineNotice && (
          <div className="flex items-center space-x-2 text-xs font-medium text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200/80 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{inlineNotice}</span>
          </div>
        )}

        {/* Display message after at least one selection */}
        {selectedTakeaways.length > 0 && (
          <div className="flex items-center space-x-2 p-4 bg-stone-100 rounded-2xl border border-stone-200/80 text-sm font-medium text-stone-800 animate-in fade-in duration-300 mt-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Reflection is a first step toward more mindful AI image generation.</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Finish reflection"
        onNext={goNext}
        isNextDisabled={isNextDisabled}
        nextHelperText={isNextDisabled ? 'Please select at least one takeaway above.' : undefined}
      />
    </div>
  );
};
