import React, { useState } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { ReflectionOption } from '../components/ReflectionOption';
import { NavigationControls } from '../components/NavigationControls';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const Page7WhyAccumulated: React.FC = () => {
  const {
    largestContribution,
    selectedAccumulationReasons,
    toggleAccumulationReason,
    goNext,
    goBack
  } = useWorkflow();

  const [inlineNotice, setInlineNotice] = useState<string | null>(null);

  const options = [
    'I generated many options before choosing one.',
    'I regenerated images repeatedly to refine details.',
    'I tested different styles, prompts, or compositions.',
    'I used high-resolution images before the final stage.',
    'Many generated images were discarded.',
    'I did not notice how quickly repeated generation accumulated.'
  ];

  const handleOptionToggle = (opt: string) => {
    const res = toggleAccumulationReason(opt);
    if (!res.success && res.message) {
      setInlineNotice(res.message);
    } else {
      setInlineNotice(null);
    }
  };

  const isNextDisabled = selectedAccumulationReasons.length === 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-2">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          Why did this footprint accumulate?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600">
          Think about what happened during your image generation process.
        </p>
      </div>

      {/* MODULE 1: LARGEST CONTRIBUTION */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-2xs space-y-3">
        <div className="flex items-center space-x-2 text-emerald-800 text-xs font-mono uppercase tracking-wider font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>Pattern Insight</span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
          {largestContribution.messageHeading}
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed">
          {largestContribution.messageText}
        </p>
      </div>

      {/* MODULE 2: REFLECTION QUESTION */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
            What do you think caused this accumulation?
          </h3>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
            Select 1 to 3
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => (
            <ReflectionOption
              key={opt}
              label={opt}
              isSelected={selectedAccumulationReasons.includes(opt)}
              onToggle={() => handleOptionToggle(opt)}
            />
          ))}
        </div>

        {/* Gentle inline notice when attempting 4th item */}
        {inlineNotice && (
          <div className="flex items-center space-x-2 text-xs font-medium text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200/80 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{inlineNotice}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Think about future use"
        onNext={goNext}
        isNextDisabled={isNextDisabled}
        nextHelperText={isNextDisabled ? 'Please select at least one cause above to continue.' : undefined}
      />
    </div>
  );
};
