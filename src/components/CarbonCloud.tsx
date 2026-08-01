import React, { useState } from 'react';
import { EstimateType } from '../types';
import { formatCarbon } from '../utils/calculations';
import { EstimateTypeLabel } from './EstimateTypeLabel';
import { Layers, Info, X } from 'lucide-react';

interface CarbonCloudProps {
  stage: 'ideation' | 'iteration' | 'refinement';
  ideationCount: number;
  ideationCarbon: number;
  ideationResolution?: string;
  iterationCount: number;
  iterationCarbon: number;
  iterationResolution?: string;
  refinementCount: number;
  refinementCarbon: number;
  refinementResolution?: string;
  totalCarbon: number;
  totalImageCount: number;
  estimateType: EstimateType;
  selectedModelName?: string | null;
}

export const CarbonCloud: React.FC<CarbonCloudProps> = ({
  stage,
  ideationCount,
  ideationCarbon,
  ideationResolution = '1024',
  iterationCount,
  iterationCarbon,
  iterationResolution = '1024',
  refinementCount,
  refinementCarbon,
  refinementResolution = '1024',
  totalCarbon,
  totalImageCount,
  estimateType
}) => {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  // Bounded non-linear visual scaling for stage-by-stage cloud layers
  const safeTotal = totalCarbon > 0 ? totalCarbon : 1;
  const ideationProp = Math.max(0, ideationCarbon / safeTotal);
  const iterationProp = Math.max(0, iterationCarbon / safeTotal);
  const refinementProp = Math.max(0, refinementCarbon / safeTotal);

  // 1. Stage-by-stage layer visibility (Zero images in stage 1 = No cloud shown; zero new images in later stages = no new layer)
  const showStage1 = ideationCount > 0;
  const showStage2 = (stage === 'iteration' || stage === 'refinement') && iterationCount > 0;
  const showStage3 = stage === 'refinement' && refinementCount > 0;

  // 2. Resolution-based expansion parameters:
  // 512x512 = smaller per-image growth (7px per image)
  // 1024x1024 = noticeably larger per-image growth (14px per image)
  const getParams = (res?: string) => {
    return res === '512'
      ? { base: 35, step: 4, offset: 8 }
      : { base: 45, step: 8, offset: 12 };
  };

  const p1 = getParams(ideationResolution);
  const p2 = getParams(iterationResolution);
  const p3 = getParams(refinementResolution);

  // Stage 1 (Ideation - Green Base Cloud): Starts small at 1 image, grows uniformly per image
  const d1 = showStage1 ? Math.min(220, p1.base + (ideationCount - 1) * p1.step) : 0;

  // Stage 2 (Iteration - Blue Outer Expansion): Starts with small offset around d1, grows uniformly per image
  const d2 = showStage2 ? Math.min(260, d1 + p2.offset + (iterationCount - 1) * p2.step) : d1;

  // Stage 3 (Refinement - Purple Outermost Expansion): Starts with small offset around d2, grows uniformly per image
  const d3 = showStage3 ? Math.min(300, d2 + p3.offset + (refinementCount - 1) * p3.step) : d2;

  // Active maximum diameter for container framing and glow
  const maxActiveDiameter = showStage3 ? d3 : showStage2 ? d2 : d1;

  // Edge sharpness based on estimateType (representative vs model_based)
  const isRepresentative = estimateType === 'representative';
  const blurAmount = isRepresentative
    ? 'filter blur-md opacity-85'
    : 'filter blur-xs opacity-95 shadow-2xs';

  return (
    <div className="w-full bg-linear-to-b from-stone-50/90 to-neutral-100/80 border border-neutral-200/80 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between relative min-h-[420px] transition-all">
      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between z-10 mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          Carbon Cloud Visualizer
        </span>
        <EstimateTypeLabel estimateType={estimateType} />
      </div>

      {/* Main Interactive Cloud Canvas */}
      <div
        className="relative w-full min-h-[260px] flex items-center justify-center my-2 group cursor-pointer focus:outline-none"
        tabIndex={stage === 'refinement' ? 0 : -1}
        onClick={() => {
          if (stage === 'refinement') setIsBreakdownOpen(!isBreakdownOpen);
        }}
        onKeyDown={(e) => {
          if (stage === 'refinement' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsBreakdownOpen(!isBreakdownOpen);
          }
        }}
        aria-label={
          stage === 'refinement'
            ? 'Interactive carbon cloud. Click or press space to toggle breakdown.'
            : 'Carbon cloud visual representation.'
        }
      >
        {/* Ambient Glow */}
        {showStage1 && (
          <div
            className={`absolute rounded-full transition-all duration-700 ease-out ${
              showStage3
                ? 'bg-[#6E8879]/40 blur-2xl'
                : showStage2
                ? 'bg-[#679B7C]/40 blur-2xl'
                : isRepresentative
                ? 'bg-[#63D691]/40 blur-2xl'
                : 'bg-[#63D691]/40 blur-xl'
            }`}
            style={{
              width: `${maxActiveDiameter * 1.3}px`,
              height: `${maxActiveDiameter * 1.3}px`
            }}
          />
        )}

        {/* Layer 3: Stage 3 (Refinement - #6E8879 Outermost Expansion) */}
        {showStage3 && (
          <div
            className={`absolute rounded-full transition-all duration-700 ease-out z-10 ${blurAmount}`}
            style={{
              width: `${d3}px`,
              height: `${d3}px`,
              backgroundColor: '#6E8879'
            }}
          />
        )}

        {/* Layer 2: Stage 2 (Iteration - #679B7C Middle Expansion) */}
        {showStage2 && (
          <div
            className={`absolute rounded-full transition-all duration-700 ease-out z-20 ${blurAmount}`}
            style={{
              width: `${d2}px`,
              height: `${d2}px`,
              backgroundColor: '#679B7C'
            }}
          />
        )}

        {/* Layer 1: Stage 1 (Ideation - #63D691 Center Base Cloud) */}
        {showStage1 && (
          <div
            className={`absolute rounded-full transition-all duration-700 ease-out z-30 ${blurAmount}`}
            style={{
              width: `${d1}px`,
              height: `${d1}px`,
              backgroundColor: '#63D691'
            }}
          />
        )}

        {/* Bottom-Right Information Label Annotation */}
        <div className="absolute bottom-2 right-2 sm:right-4 z-40 flex flex-col items-end px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-xs border border-neutral-200/80 text-right transition-transform group-hover:scale-105 pointer-events-auto">
          <span className="text-xs font-bold font-mono tracking-tight text-neutral-900">
            {formatCarbon(totalCarbon)}
          </span>
          <span className="text-[10px] font-medium text-neutral-600 mt-0.5">
            {totalImageCount} {totalImageCount === 1 ? 'image' : 'images'}
          </span>
          {stage === 'refinement' && (
            <span className="text-[9px] text-emerald-800 font-medium mt-0.5 underline decoration-dotted">
              {isBreakdownOpen ? 'Close breakdown' : 'Tap for breakdown'}
            </span>
          )}
        </div>
      </div>

      {/* Stage Context Summaries */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-neutral-200/70 text-center space-y-1 z-10 shadow-2xs">
        {stage === 'ideation' && (
          <>
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Ideation Stage</p>
            <p className="text-sm font-semibold text-neutral-800">{ideationCount} images</p>
            <p className="text-xs text-neutral-600">
              Estimated footprint: <span className="font-mono font-medium text-emerald-800">{formatCarbon(ideationCarbon)}</span>
            </p>
          </>
        )}

        {stage === 'iteration' && (
          <>
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Iteration Stage</p>
            <p className="text-sm font-semibold text-neutral-800">{iterationCount} regenerations</p>
            <p className="text-xs text-neutral-600">
              Added footprint: <span className="font-mono font-medium text-emerald-800">{formatCarbon(iterationCarbon)}</span>
            </p>
          </>
        )}

        {stage === 'refinement' && (
          <>
            <p className="text-xs text-neutral-600">
              You generated a total of <span className="font-semibold text-neutral-900">{totalImageCount} images</span> across your creative process.
            </p>
            <p className="text-sm font-semibold text-neutral-900">
              Estimated total footprint: <span className="font-mono text-emerald-800">{formatCarbon(totalCarbon)}</span>
            </p>
          </>
        )}
      </div>

      {/* Stage 5 Interactive Breakdown Card */}
      {stage === 'refinement' && (
        <div className="mt-3 w-full">
          <button
            type="button"
            onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-stone-100 hover:bg-stone-200/80 text-neutral-800 text-xs font-semibold rounded-xl transition-colors border border-neutral-200/80 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-expanded={isBreakdownOpen}
          >
            <Layers className="w-3.5 h-3.5 text-neutral-600" />
            <span>{isBreakdownOpen ? 'Hide stage breakdown' : 'Explore stage breakdown bubbles'}</span>
          </button>

          {isBreakdownOpen && (
            <div className="mt-3 p-5 bg-white rounded-2xl border border-neutral-200 shadow-xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-neutral-800">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>Workflow Contribution Breakdown</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBreakdownOpen(false)}
                  className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md"
                  aria-label="Close breakdown card"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bubbles Visual Container */}
              <div className="flex flex-wrap items-center justify-center gap-4 py-3 min-h-[100px] bg-neutral-50/80 rounded-xl p-3 border border-neutral-100">
                {/* Ideation Bubble */}
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900 font-mono font-bold text-xs shadow-2xs transition-all"
                    style={{
                      width: `${Math.max(48, Math.min(100, 48 + ideationProp * 52))}px`,
                      height: `${Math.max(48, Math.min(100, 48 + ideationProp * 52))}px`,
                      backgroundColor: '#63D691'
                    }}
                  >
                    {Math.round(ideationProp * 100)}%
                  </div>
                  <span className="text-[11px] font-medium text-neutral-600 mt-1">Ideation</span>
                </div>

                {/* Iteration Bubble */}
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full border border-neutral-400 flex items-center justify-center text-neutral-900 font-mono font-bold text-xs shadow-2xs transition-all"
                    style={{
                      width: `${Math.max(48, Math.min(100, 48 + iterationProp * 52))}px`,
                      height: `${Math.max(48, Math.min(100, 48 + iterationProp * 52))}px`,
                      backgroundColor: '#679B7C'
                    }}
                  >
                    {Math.round(iterationProp * 100)}%
                  </div>
                  <span className="text-[11px] font-medium text-neutral-600 mt-1">Iteration</span>
                </div>

                {/* Refinement Bubble */}
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full border border-neutral-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-2xs transition-all"
                    style={{
                      width: `${Math.max(48, Math.min(100, 48 + refinementProp * 52))}px`,
                      height: `${Math.max(48, Math.min(100, 48 + refinementProp * 52))}px`,
                      backgroundColor: '#6E8879'
                    }}
                  >
                    {Math.round(refinementProp * 100)}%
                  </div>
                  <span className="text-[11px] font-medium text-neutral-600 mt-1">Refinement</span>
                </div>
              </div>

              {/* Exact Text Itemized List */}
              <div className="space-y-2 text-xs divide-y divide-neutral-100">
                <div className="pt-1 flex justify-between items-center text-neutral-700">
                  <span className="font-medium">Ideation: {ideationCount} images</span>
                  <span className="font-mono text-neutral-900 font-semibold">{formatCarbon(ideationCarbon)}</span>
                </div>
                <div className="pt-2 flex justify-between items-center text-neutral-700">
                  <span className="font-medium">Iteration: {iterationCount} images</span>
                  <span className="font-mono text-neutral-900 font-semibold">{formatCarbon(iterationCarbon)}</span>
                </div>
                <div className="pt-2 flex justify-between items-center text-neutral-700">
                  <span className="font-medium">Refinement: {refinementCount} images</span>
                  <span className="font-mono text-neutral-900 font-semibold">{formatCarbon(refinementCarbon)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
