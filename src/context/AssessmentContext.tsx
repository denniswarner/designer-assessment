// File: src/context/AssessmentContext.tsx
// This file helps us share assessment data between different pages
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AssessmentData {
  [role: string]: {
    sections: {
      title: string;
      score: number;
    }[];
    overallScore: number;
    qualitativeNotes: string;
  };
}

const AssessmentContext = createContext<{
  assessmentData: AssessmentData;
  updateAssessment: (role: string, data: any) => void;
}>({
  assessmentData: {},
  updateAssessment: () => {},
});

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});

  const updateAssessment = (role: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [role]: {
        sections: data.sections,
        overallScore: data.overallScore,
        qualitativeNotes: data.qualitativeNotes
      }
    }));
  };

  return (
    <AssessmentContext.Provider value={{ assessmentData, updateAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}