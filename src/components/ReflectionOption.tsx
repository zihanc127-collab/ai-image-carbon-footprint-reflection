import React from 'react';
import { Check } from 'lucide-react';

interface ReflectionOptionProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const ReflectionOption: React.FC<ReflectionOptionProps> = ({
  label,
  isSelected,
  onToggle
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
        isSelected
          ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
          : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50/80'
      }`}
    >
      <span className="text-sm sm:text-base font-medium pr-3">{label}</span>
      <div
        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'bg-emerald-500 border-emerald-500 text-neutral-950'
            : 'border-neutral-300 bg-neutral-50 group-hover:border-neutral-400'
        }`}
      >
        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </button>
  );
};
