// File: src/components/ProductDesignerAssessment/ProductDesignerAssessment.tsx
// Purpose: Main assessment component for Product Designer role evaluation
// This component manages the overall assessment state and layout

import React, { useState, useEffect } from 'react';
import { ScoreSlider } from '@/components/ui/Slider';

// Define the structure of our assessment data using TypeScript interfaces
interface AssessmentCriterion {
  id: string;
  description: string;
  score: number;
}

interface AssessmentSection {
  title: string;
  criteria: AssessmentCriterion[];
  averageScore: number;
}

// Our main component is a function that returns a React element
const ProductDesignerAssessment = (): React.ReactElement => {
  // Initialize our assessment sections with their criteria
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      title: "Strategic Thinking & Domain Expertise",
      criteria: [
        {
          id: "problem_identification",
          description: "Proactively identifies gaps or improvement areas in the problem definitions they are working in occasionally",
          score: 0
        },
        {
          id: "customer_understanding",
          description: "Understands the voice of the customer, and leverages research to make well-informed product decisions. Justifies ideas based on real evidence vs just intuition",
          score: 0
        },
        {
          id: "industry_trends",
          description: "Starting to understand and recognize industry patterns and trends",
          score: 0
        },
        {
          id: "competitor_awareness",
          description: "Awareness of what's happening with our competitors and within our industry for their use case area",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Craft & Quality",
      criteria: [
        {
          id: "design_system",
          description: "Takes the time to understand our design system and lean on existing patterns",
          score: 0
        },
        {
          id: "design_principles",
          description: "Understands and adheres to our org's design principles with a decreasing need for guidance",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Leadership, Communication, & Collaboration",
      criteria: [
        {
          id: "cross_functional",
          description: "Can facilitate cross-functional conversations between design, product, ops, and business",
          score: 0
        },
        {
          id: "research_challenges",
          description: "Identifies challenges that arise during the course of research can effectively articulate the problem to stakeholders",
          score: 0
        },
        {
          id: "values_application",
          description: "Learns our values and starts consciously applying these",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Team Culture",
      criteria: [
        {
          id: "participation",
          description: "Regularly participates in research, design, and product team meetings, critiques, and events",
          score: 0
        },
        {
          id: "feedback",
          description: "Seeks to provide actionable feedback to others projects when possible",
          score: 0
        },
        {
          id: "hiring",
          description: "Participates in hiring processes as needed",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Independence & Growth Mindset",
      criteria: [
        {
          id: "guidance",
          description: "Needs guidance in some areas",
          score: 0
        },
        {
          id: "improvement",
          description: "Consistently seek out opportunities to improve",
          score: 0
        },
        {
          id: "resilience",
          description: "Be resilient when you face setbacks",
          score: 0
        }
      ],
      averageScore: 0
    }
  ]);

  // Track the overall assessment score
  const [overallScore, setOverallScore] = useState<number>(0);
  
  // Store any qualitative feedback
  const [qualitativeNotes, setQualitativeNotes] = useState<string>("");

  // Update a specific criterion's score and recalculate averages
  const updateScore = (sectionIndex: number, criterionIndex: number, newScore: number): void => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      // Update the individual criterion score
      newSections[sectionIndex].criteria[criterionIndex].score = newScore;
      
      // Recalculate the section average
      const sectionScores = newSections[sectionIndex].criteria.map(c => c.score);
      newSections[sectionIndex].averageScore = 
        sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
      
      return newSections;
    });
  };

  // Recalculate overall score whenever section scores change
  useEffect(() => {
    const newOverallScore = 
      sections.reduce((sum, section) => sum + section.averageScore, 0) / sections.length;
    setOverallScore(newOverallScore);
  }, [sections]);

  // Render our component
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header section */}
      <div className="mb-8 p-6 bg-blue-100 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Product Designer</h1>
        <p className="text-gray-600 mt-2">
          Assessment for the Product Designer role level
        </p>
      </div>

      {/* Assessment sections */}
      {sections.map((section, sectionIndex) => (
        <div key={section.title} className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {section.title}
          </h2>
          
          {/* Criteria within each section */}
          <div className="space-y-6">
            {section.criteria.map((criterion, criterionIndex) => (
              <div key={criterion.id} className="pb-4">
                <ScoreSlider
  value={criterion.score}
  onChange={(value: number) => 
    updateScore(sectionIndex, criterionIndex, value)
  }
  min={0}
  max={5}
  step={0.5}
  showLabels={true}
  description={criterion.description}
/>
              </div>
            ))}
          </div>
          
          {/* Section average score */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
  <div className="flex justify-between items-center">
    <span className="text-lg font-bold text-gray-500">
      {section.title} Score
    </span>
    <span className="text-lg font-bold text-gray-900">
      {section.averageScore.toFixed(1)}
    </span>
  </div>
</div>
        </div>
      ))}

      {/* Summary section */}
      <div className="mb-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Summary - Product Designer
        </h2>
        
        {/* Section summaries */}
        <div className="space-y-2">
          {sections.map(section => (
            <div key={section.title} className="flex justify-between text-sm">
              <span className="text-gray-600">{section.title}</span>
              <span className="font-medium text-gray-900">
                {section.averageScore.toFixed(1)}
              </span>
            </div>
          ))}
          
          {/* Overall score */}
          <div className="pt-2 mt-2 border-t border-blue-200">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900">Overall Score</span>
              <span className="text-gray-900">{overallScore.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Qualitative notes section */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Qualitative Notes
        </h2>
        <textarea
          className="w-full h-32 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter specific examples, areas of improvement and development goals for this level"
          value={qualitativeNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => 
            setQualitativeNotes(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ProductDesignerAssessment;