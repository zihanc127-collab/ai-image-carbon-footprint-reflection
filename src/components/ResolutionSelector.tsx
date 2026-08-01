import React from 'react';
import { Resolution } from '../types';

interface ResolutionSelectorProps {
  value: Resolution;
  onChange: (res: Resolution) => void;
  questionText?: string;
}

export const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({
  value,
  onChange,
  questionText = 'What resolution did you mostly use?'
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-800">
        {questionText}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('512')}
          aria-pressed={value === '512'}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
            value === '512'
              ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
          }`}
        >
          <span>Mostly 512 × 512</span>
          <span className={`text-xs px-2 py-0.5 rounded-md ${value === '512' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'}`}>
            Standard
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChange('1024')}
          aria-pressed={value === '1024'}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
            value === '1024'
              ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
          }`}
        >
          <span>Mostly 1024 × 1024</span>
          <span className={`text-xs px-2 py-0.5 rounded-md ${value === '1024' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'}`}>
            High Res
          </span>
        </button>
      </div>
    </div>
  );
};
