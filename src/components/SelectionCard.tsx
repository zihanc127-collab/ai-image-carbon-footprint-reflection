import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  subtitle,
  isSelected,
  onSelect,
  className = ''
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
        isSelected
          ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
          : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50/80'
      } ${className}`}
    >
      <div className="space-y-0.5 pr-2">
        <div className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </div>
        {subtitle && (
          <div className={`text-xs ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
            {subtitle}
          </div>
        )}
      </div>

      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'bg-emerald-500 border-emerald-500 text-neutral-950'
            : 'border-neutral-300 bg-neutral-50 group-hover:border-neutral-400'
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </button>
  );
};
