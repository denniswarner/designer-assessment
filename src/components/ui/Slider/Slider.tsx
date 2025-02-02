// File: src/components/ui/Slider/Slider.tsx
// Purpose: A reusable slider component for scoring assessments
// This component provides a consistent scoring interface across the application

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

// Define our component's props with explicit TypeScript types
export interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showLabels?: boolean;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 5,
  step = 0.5,
  showLabels = true
}) => {
  // Create a properly typed array for our labels
  const labelValues: number[] = Array.from(
    { length: ((max - min) / 1) + 1 },
    (_, i): number => min + i
  );

  // Handle value changes with type safety
  const handleValueChange = (newValues: number[]): void => {
    onChange(newValues[0]);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <RadixSlider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value]}
          max={max}
          min={min}
          step={step}
          onValueChange={handleValueChange}
        >
          <RadixSlider.Track className="bg-gray-200 relative grow h-1 rounded-full">
            <RadixSlider.Range className="absolute bg-blue-600 rounded-full h-full" />
          </RadixSlider.Track>
          <RadixSlider.Thumb
            className="block w-4 h-4 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </RadixSlider.Root>

        {/* Tick marks with type-safe mapping */}
        <div className="absolute top-[10px] left-0 right-0 flex justify-between px-[6px]">
          {labelValues.map((tickValue: number): React.ReactElement => (
            <div 
              key={tickValue} 
              className="w-0.5 h-1 bg-gray-300"
            />
          ))}
        </div>

        {/* Numeric labels with conditional rendering and type safety */}
        {showLabels && (
          <div className="relative mt-2 flex justify-between text-xs text-gray-600">
            {labelValues.map((labelValue: number): React.ReactElement => (
              <div key={labelValue} className="flex flex-col items-center">
                <span>{labelValue}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreSlider;