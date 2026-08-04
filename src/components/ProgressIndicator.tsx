import React from 'react';

interface ProgressIndicatorProps {
  currentPage: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentPage }) => {
  if (currentPage === 1 || currentPage === 10) {
    return null; // Keep intro and completion visually clean
  }

  // 8 active pages total (pages 2 to 9)
  // Step 2: Page 2 (Setup), Page 3 (Overview)
  // Step 3: Page 4 (Ideation), Page 5 (Iteration), Page 6 (Refinement)
  // Step 4: Page 7 (Accumulation), Page 8 (Pattern Analysis), Page 9 (Future Intent)
  const getStepInfo = (page: number) => {
    switch (page) {
      case 2:
        return { stepNumber: 2, stepTitle: 'Setup', pageInStep: '1 of 2' };
      case 3:
        return { stepNumber: 2, stepTitle: 'Overview', pageInStep: '2 of 2' };
      case 4:
        return { stepNumber: 3, stepTitle: 'Ideation', pageInStep: '1 of 3' };
      case 5:
        return { stepNumber: 3, stepTitle: 'Iteration', pageInStep: '2 of 3' };
      case 6:
        return { stepNumber: 3, stepTitle: 'Refinement', pageInStep: '3 of 3' };
      case 7:
        return { stepNumber: 4, stepTitle: 'Accumulation', pageInStep: '1 of 3' };
      case 8:
        return { stepNumber: 4, stepTitle: 'Pattern Analysis', pageInStep: '2 of 3' };
      case 9:
        return { stepNumber: 4, stepTitle: 'Future Intent', pageInStep: '3 of 3' };
      default:
        return { stepNumber: 1, stepTitle: 'Intro', pageInStep: '' };
    }
  };

  const { stepNumber, stepTitle, pageInStep } = getStepInfo(currentPage);
  const totalActivePages = 8; // Pages 2-9

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-500 font-medium mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-emerald-800 font-semibold">Step {stepNumber}</span>
          <span className="text-neutral-300">•</span>
          <span>{stepTitle}</span>
        </div>
        <div className="text-neutral-400 font-mono">
          Page {currentPage - 1} of {totalActivePages} <span className="text-neutral-300">({pageInStep})</span>
        </div>
      </div>

      {/* Subtle non-survey progress bar */}
      <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden flex">
        {Array.from({ length: 8 }).map((_, idx) => {
          const pageNum = idx + 2;
          const isActive = pageNum <= currentPage;
          const isCurrent = pageNum === currentPage;

          return (
            <div
              key={pageNum}
              className={`h-full flex-1 transition-all duration-500 border-r border-white/60 last:border-r-0 ${
                isCurrent
                  ? 'bg-neutral-800'
                  : isActive
                  ? 'bg-neutral-300'
                  : 'bg-neutral-100'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
