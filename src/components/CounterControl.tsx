import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CounterControlProps {
  value: number;
  onChange: (val: number) => void;
  labelSingular?: string;
  labelPlural?: string;
  min?: number;
  max?: number;
}

export const CounterControl: React.FC<CounterControlProps> = ({
  value,
  onChange,
  labelSingular = 'image',
  labelPlural = 'images',
  min = 0,
  max = 30
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      onChange(min);
    } else {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(clamped);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  const unitText = value === 1 ? labelSingular : labelPlural;

  return (
    <div className="w-full bg-stone-50/80 border border-neutral-200/80 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-3">
        {/* Minus button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Decrease count from ${value}`}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-2xs focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          <Minus className="w-5 h-5" />
        </button>

        {/* Value Display and Numeric Input */}
        <div className="flex-1 flex items-center justify-center space-x-2 bg-white border border-neutral-200 rounded-xl py-2 px-4 shadow-2xs">
          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={handleInputChange}
            className="w-14 text-center font-semibold text-2xl text-neutral-900 bg-transparent focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-md"
            aria-label="Image count"
          />
          <span className="text-sm font-medium text-neutral-600 select-none">{unitText}</span>
        </div>

        {/* Plus button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label={`Increase count from ${value}`}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-2xs focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Slider */}
      <div className="space-y-1 pt-1">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          aria-label={`Adjust ${unitText} slider`}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 font-mono px-0.5">
          <span>{min}</span>
          <span>15</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
