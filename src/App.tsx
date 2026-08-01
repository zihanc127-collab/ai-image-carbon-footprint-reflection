import React from 'react';
import { WorkflowProvider, useWorkflow } from './context/WorkflowContext';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Page1Intro } from './pages/Page1Intro';
import { Page2Setup } from './pages/Page2Setup';
import { Page3Ideation } from './pages/Page3Ideation';
import { Page4Iteration } from './pages/Page4Iteration';
import { Page5Refinement } from './pages/Page5Refinement';
import { Page6Accumulation } from './pages/Page6Accumulation';
import { Page7WhyAccumulated } from './pages/Page7WhyAccumulated';
import { Page8NextTime } from './pages/Page8NextTime';
import { PageCompletion } from './pages/PageCompletion';
import { Leaf, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, resetWorkflow } = useWorkflow();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1Intro />;
      case 2:
        return <Page2Setup />;
      case 3:
        return <Page3Ideation />;
      case 4:
        return <Page4Iteration />;
      case 5:
        return <Page5Refinement />;
      case 6:
        return <Page6Accumulation />;
      case 7:
        return <Page7WhyAccumulated />;
      case 8:
        return <Page8NextTime />;
      case 9:
        return <PageCompletion />;
      default:
        return <Page1Intro />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/60 text-neutral-800 font-sans flex flex-col justify-between selection:bg-stone-200">
      {/* Top Header */}
      <header className="border-b border-neutral-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5 text-neutral-900 font-serif font-bold text-base sm:text-lg text-left min-w-0">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-mono text-sm shadow-2xs shrink-0">
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="tracking-tight leading-tight">Carbon Footprint Reflection for AI Image Generation</span>
          </div>

          <span className="text-xs font-mono text-neutral-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200 shrink-0 whitespace-nowrap">
            Design Research Prototype
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <ProgressIndicator currentPage={currentPage} />
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/60 bg-white py-6 mt-12 text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span>Reflective Design Tool • Measured dataset model calculations run locally in browser</span>
          </div>
          <div className="text-neutral-400">
            Based on measured per-image CO₂ dataset
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <WorkflowProvider>
      <AppContent />
    </WorkflowProvider>
  );
}
