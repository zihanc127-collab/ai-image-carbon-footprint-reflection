import React from 'react';
import { formatCarbon } from '../utils/calculations';

interface CumulativeStatusProps {
  imageCount: number;
  totalCarbon: number;
}

export const CumulativeStatus: React.FC<CumulativeStatusProps> = ({ imageCount, totalCarbon }) => {
  return (
    <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-neutral-800">
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs uppercase tracking-wider font-mono text-neutral-400">Live Cumulative Status</span>
      </div>
      <div className="text-sm sm:text-base font-medium font-sans tracking-tight text-neutral-100">
        Total so far: <span className="font-semibold text-white">{imageCount} images</span> ·{' '}
        <span className="font-semibold text-emerald-300 font-mono">{formatCarbon(totalCarbon)}</span>
      </div>
    </div>
  );
};
