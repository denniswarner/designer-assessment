// File: src/components/ui/Slider/Slider.tsx
// Purpose: A reusable slider component for scoring assessments

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

export interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showLabels?: boolean;
  description?: string;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 5,
  step = 0.5,
  showLabels = true,
  description
}) => {
  // Create array for just the labels (we removed the ticks array since we don't need it anymore)
  const labels = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleValueChange = (newValues: number[]): void => {
    onChange(newValues[0]);
  };

  return (
    <div className="flex justify-between items-start gap-20 py-2">
      {/* Description text on the left */}
      {description && (
        <div className="flex-1">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
      
      {/* Slider container on the right */}
      <div className="w-60">
        <div className="relative">
          {/* The actual slider component */}
          <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            value={[value]}
            max={max}
            min={min}
            step={step}
            onValueChange={handleValueChange}
          >
            {/* Background track */}
            <RadixSlider.Track className="relative h-2 w-full grow rounded-full bg-gray-200">
              {/* Colored part of the track */}
              <RadixSlider.Range className="absolute h-full rounded-full bg-blue-600" />
            </RadixSlider.Track>

            {/* The draggable thumb */}
            <RadixSlider.Thumb
              className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-50"
            />
          </RadixSlider.Root>

          {/* Labels container */}
          {showLabels && (
            <div className="absolute left-0 right-0 top-8 flex justify-between">
              {labels.map((label) => (
                <div
                  key={label}
                  className="flex flex-col items-center"
                >
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreSlider;