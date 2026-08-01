import React from 'react';
import { Info } from 'lucide-react';

interface InformationCardProps {
  text: string;
  className?: string;
}

export const InformationCard: React.FC<InformationCardProps> = ({ text, className = '' }) => {
  return (
    <div
      className={`bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-stone-700 text-sm leading-relaxed ${className}`}
    >
      <Info className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
      <div className="font-sans text-stone-700 font-normal">{text}</div>
    </div>
  );
};
