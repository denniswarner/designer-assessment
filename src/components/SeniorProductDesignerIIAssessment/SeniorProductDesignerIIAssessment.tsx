// File: src/components/SeniorProductDesignerIIAssessment/SeniorProductDesignerIIAssessment.tsx
// Purpose: Assessment component for Senior Product Designer II role evaluation
// This component handles the scoring, calculations, and layout specific to this role level

import React, { useState, useEffect } from 'react';
import { ScoreSlider } from '@/components/ui/Slider';

// Define our TypeScript interfaces for type safety
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

const SeniorProductDesignerIIAssessment = (): React.ReactElement => {
  // Initialize our sections with Senior PD II specific criteria
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      title: "Strategic Thinking & Domain Expertise",
      criteria: [
        {
          id: "product_strategy",
          description: "Contributes to product strategy discussions and helps shape the product roadmap",
          score: 0
        },
        {
          id: "industry_knowledge",
          description: "Deep understanding of industry trends and their impact on product decisions",
          score: 0
        },
        {
          id: "user_advocacy",
          description: "Strong advocate for user needs while balancing business requirements",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Leadership & Team Impact",
      criteria: [
        {
          id: "mentorship",
          description: "Actively mentors junior designers and helps them grow in their careers",
          score: 0
        },
        {
          id: "project_leadership",
          description: "Takes ownership of complex projects and guides them to successful completion",
          score: 0
        },
        {
          id: "cross_functional",
          description: "Effectively leads cross-functional initiatives and builds consensus",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Design Excellence",
      criteria: [
        {
          id: "system_thinking",
          description: "Demonstrates excellent system thinking and creates scalable design solutions",
          score: 0
        },
        {
          id: "quality_standards",
          description: "Sets and maintains high quality standards for the design team",
          score: 0
        },
        {
          id: "innovation",
          description: "Drives innovation while ensuring consistency with design principles",
          score: 0
        }
      ],
      averageScore: 0
    }
  ]);

  const [overallScore, setOverallScore] = useState<number>(0);
  const [qualitativeNotes, setQualitativeNotes] = useState<string>("");

  // Update individual scores and recalculate averages
  const updateScore = (sectionIndex: number, criterionIndex: number, newScore: number): void => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].criteria[criterionIndex].score = newScore;
      
      // Calculate new section average
      const sectionScores = newSections[sectionIndex].criteria.map(c => c.score);
      newSections[sectionIndex].averageScore = 
        sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
      
      return newSections;
    });
  };

  // Update overall score whenever section scores change
  useEffect(() => {
    const newOverallScore = 
      sections.reduce((sum, section) => sum + section.averageScore, 0) / sections.length;
    setOverallScore(newOverallScore);
  }, [sections]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header section with purple theme */}
      <div className="mb-8 p-6 bg-purple-100 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Senior Product Designer II</h1>
        <p className="text-gray-600 mt-2">
          Assessment for the Senior Product Designer II role level
        </p>
      </div>

      {/* Assessment sections */}
      {sections.map((section, sectionIndex) => (
        <div key={section.title} className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {section.title}
          </h2>
          
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
          
          {/* Section score */}
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

      {/* Summary section with purple theme */}
      <div className="mb-8 bg-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Summary - Senior Product Designer II
        </h2>
        
        <div className="space-y-2">
          {sections.map(section => (
            <div key={section.title} className="flex justify-between text-sm">
              <span className="text-gray-600">{section.title}</span>
              <span className="font-medium text-gray-900">
                {section.averageScore.toFixed(1)}
              </span>
            </div>
          ))}
          
          <div className="pt-2 mt-2 border-t border-purple-200">
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
          className="w-full h-32 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

export default SeniorProductDesignerIIAssessment;