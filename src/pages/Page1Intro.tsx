import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { NavigationControls } from '../components/NavigationControls';
import { Sparkles, RefreshCw, Feather } from 'lucide-react';

export const Page1Intro: React.FC = () => {
  const { goNext } = useWorkflow();

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 py-4">
      {/* Editorial Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/80 text-xs font-mono uppercase tracking-wider text-neutral-600">
          <span>Design Research Initiative</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-neutral-900 leading-tight">
          Every AI-generated image has a hidden footprint.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
          This website helps you reflect on the estimated carbon footprint of AI image generation, from one image to a whole creative workflow.
        </p>
      </div>

      {/* 3 Short Statements */}
      <div className="grid grid-cols-1 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans pt-0.5">
            AI image generation often happens through repeated exploration, regeneration and refinement.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans pt-0.5">
            Although each image may seem small, repeated generation can accumulate across a design session.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
            <Feather className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans pt-0.5">
            This tool helps you reflect on that hidden process without interrupting your creative flow.
          </p>
        </div>
      </div>

      {/* Primary Navigation */}
      <NavigationControls
        showBack={false}
        nextLabel="Start exploration"
        onNext={goNext}
      />
    </div>
  );
};
