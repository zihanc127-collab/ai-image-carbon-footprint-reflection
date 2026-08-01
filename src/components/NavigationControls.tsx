import React from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  showBack?: boolean;
  onBack?: () => void;
  nextLabel: string;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextHelperText?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  showBack = true,
  onBack,
  nextLabel,
  onNext,
  isNextDisabled = false,
  nextHelperText
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-label="Go back to previous page"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="flex flex-col items-end w-full sm:w-auto">
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={`inline-flex items-center justify-center space-x-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-800 ${
            isNextDisabled
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
              : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow active:scale-[0.99]'
          }`}
        >
          <span>{nextLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {nextHelperText && isNextDisabled && (
          <span className="text-xs text-amber-700/80 mt-1.5 font-medium">{nextHelperText}</span>
        )}
      </div>
    </div>
  );
};
