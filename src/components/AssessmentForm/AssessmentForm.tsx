// File: src/components/AssessmentForm/AssessmentForm.tsx
// Purpose: Initial assessment form that collects user information and assessment type
// This component serves as the entry point for the product design assessment process
// Location: Located in the components directory under its own AssessmentForm folder

import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Label from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

// Define our form data structure to ensure type safety throughout the component
type FormData = {
  assessmentType: 'self' | 'manager';  // Only allow these two specific types
  fullName: string;
  email: string;
  managerName: string;
  department: string;
  currentRole: string;
};

export default function AssessmentForm() {
  // Initialize router for navigation after form submission
  const router = useRouter();
  
  // Initialize form state with default values
  const [formData, setFormData] = useState<FormData>({
    assessmentType: 'self',     // Default to self assessment
    fullName: '',
    email: '',
    managerName: '',
    department: '',
    currentRole: 'Product Designer',  // Default role selection
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a production environment, we would:
    // 1. Validate all inputs
    // 2. Send data to an API endpoint
    // 3. Handle any potential errors
    // For now, we'll simply navigate to the first assessment page
    router.push('/assessment/1');
  };

  // Generic change handler for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Main heading - uses the blue color from our design system */}
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Product Design - Competency Assessment
      </h1>

      {/* Information Box - provides context and instructions */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <h2 className="font-medium text-blue-900 mb-2">Assessment Information</h2>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• This assessment will take approximately 30-45 minutes to complete</li>
          <li>• You can save your progress and return later</li>
          <li>• All responses are confidential</li>
          <li>• Be honest and reflective in your self-assessment</li>
        </ul>
      </div>

      {/* Main form element - handles data collection */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Assessment Type Selection using Radix UI for accessibility */}
        <div className="space-y-2">
          <Label.Root className="text-sm font-medium">
            Assessment Type
          </Label.Root>
          <RadioGroup.Root
            className="flex flex-col gap-2"
            value={formData.assessmentType}
            onValueChange={(value) => setFormData(prev => ({ 
              ...prev, 
              assessmentType: value as 'self' | 'manager' 
            }))}
          >
            <div className="flex items-center">
              <RadioGroup.Item
                value="self"
                id="self"
                className="h-4 w-4 rounded-full border border-gray-300 mr-2"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-blue-600" />
              </RadioGroup.Item>
              <label htmlFor="self" className="text-sm">Self Assessment</label>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item
                value="manager"
                id="manager"
                className="h-4 w-4 rounded-full border border-gray-300 mr-2"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-blue-600" />
              </RadioGroup.Item>
              <label htmlFor="manager" className="text-sm">Manager Assessment</label>
            </div>
          </RadioGroup.Root>
        </div>

        {/* Full Name Input Field */}
        <div className="space-y-1">
          <Label.Root htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </Label.Root>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email Input Field with validation */}
        <div className="space-y-1">
          <Label.Root htmlFor="email" className="text-sm font-medium">
            Email
          </Label.Root>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Conditional Manager Name Field - only shown for self assessment */}
        {formData.assessmentType === 'self' && (
          <div className="space-y-1">
            <Label.Root htmlFor="managerName" className="text-sm font-medium">
              Manager's Name
            </Label.Root>
            <input
              id="managerName"
              name="managerName"
              type="text"
              placeholder="Manager's full name"
              value={formData.managerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        {/* Department Input Field with suggestions */}
        <div className="space-y-1">
          <Label.Root htmlFor="department" className="text-sm font-medium">
            Department
          </Label.Root>
          <input
            id="department"
            name="department"
            type="text"
            placeholder="e.g., Product Design, Design Systems, UX Research"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Role Selection Dropdown */}
        <div className="space-y-1">
          <Label.Root htmlFor="currentRole" className="text-sm font-medium">
            Current Role Level
          </Label.Root>
          <select
            id="currentRole"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="Product Designer">Product Designer</option>
            <option value="Product Designer II">Product Designer II</option>
            <option value="Senior Product Designer">Senior Product Designer</option>
            <option value="Senior Product Designer II">Senior Product Designer II</option>
            <option value="Principal Product Designer">Principal Product Designer</option>
            <option value="Principal Product Designer II">Principal Product Designer II</option>
          </select>
        </div>

        {/* Submit Button - uses our primary blue color */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Assessment
        </button>
      </form>
    </div>
  );
}