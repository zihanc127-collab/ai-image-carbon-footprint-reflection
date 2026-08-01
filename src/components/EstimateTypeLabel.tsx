import React from 'react';
import { EstimateType } from '../types';

interface EstimateTypeLabelProps {
  estimateType: EstimateType;
  className?: string;
}

export const EstimateTypeLabel: React.FC<EstimateTypeLabelProps> = ({ estimateType, className = '' }) => {
  const isRepresentative = estimateType === 'representative';
  
  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
        isRepresentative
          ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isRepresentative ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />
      <span>{isRepresentative ? 'Representative estimate' : 'Model-based estimate'}</span>
    </span>
  );
};
