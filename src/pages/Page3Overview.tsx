import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { NavigationControls } from '../components/NavigationControls';

export const Page3Overview: React.FC = () => {
  const { goNext, goBack } = useWorkflow();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-2">
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          Reflect on your workflow across three stages
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          You will be asked to estimate the number and typical resolution of images generated during three parts of your creative process.
        </p>
      </div>

      {/* Three Stages Overview Cards */}
      <div className="space-y-4">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#63D691] shrink-0" />
            <h3 className="text-lg font-semibold text-neutral-900">Ideation</h3>
          </div>
          <p className="text-sm text-neutral-600 pl-5">
            Exploring initial ideas and directions
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#679B7C] shrink-0" />
            <h3 className="text-lg font-semibold text-neutral-900">Iteration</h3>
          </div>
          <p className="text-sm text-neutral-600 pl-5">
            Developing, testing and revising selected ideas
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-2xs space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E8879] shrink-0" />
            <h3 className="text-lg font-semibold text-neutral-900">Refinement</h3>
          </div>
          <p className="text-sm text-neutral-600 pl-5">
            Producing and adjusting the final output
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Continue to Ideation"
        onNext={goNext}
      />
    </div>
  );
};
