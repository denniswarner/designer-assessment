// File: src/components/ProductDesignerIIAssessment/ProductDesignerIIAssessment.tsx
// Purpose: Assessment component for Product Designer II role evaluation
// Handles scoring, calculations, and layout for PD II specific criteria

import React, { useState, useEffect } from 'react';
import { ScoreSlider } from '@/components/ui/Slider';

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

const ProductDesignerIIAssessment = (): React.ReactElement => {
  // Initialize assessment sections with PD II specific criteria
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      title: "Strategic Thinking & Domain Expertise",
      criteria: [
        {
          id: "escrow_understanding",
          description: "Understands key deals of title and escrow and the industry, title and escrow functions on teams with the ability to recommend specific areas of improvement",
          score: 0
        },
        {
          id: "problem_definition",
          description: "Partners effectively with product, ops, and others to define the problems to understand and to validate critical decision-making",
          score: 0
        },
        {
          id: "team_understanding",
          description: "Challenges and influences their team's understanding of the problem",
          score: 0
        },
        {
          id: "focus_priorities",
          description: "Knows when to focus on the big picture vs zoom into the details",
          score: 0
        },
        {
          id: "competitor_analysis",
          description: "Aware of what's happening with competitors and within our industry for their use case area. Is able to analyze the problems competitors are solving and use this to inform strategy",
          score: 0
        },
        {
          id: "role_understanding",
          description: "Has a base level understanding of title and escrow, as well as functions and responsibilities of roles on the teams",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Craft & Quality",
      criteria: [
        {
          id: "design_quality",
          description: "Work is crisp and thorough — very few pixel artifacts, misalignments, or issues with gestalt principles",
          score: 0
        },
        {
          id: "pattern_awareness",
          description: "Has a keen awareness of existing patterns bias toward leveraging familiarity over novelty",
          score: 0
        },
        {
          id: "design_principles",
          description: "Work is a great example of adhering to established design principles, and others are starting to leverage your work",
          score: 0
        },
        {
          id: "domain_expertise",
          description: "Deepening product and domain expertise, regularly participating in research",
          score: 0
        },
        {
          id: "tooling_understanding",
          description: "Deeply understand the current tooling industry and landscape, rarely missing a beat on how your projects would fit into existing customer workflows and motivations",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Leadership, Communication, & Collaboration",
      criteria: [
        {
          id: "conflict_resolution",
          description: "Can reconcile disagreements between team members to broker a resolution",
          score: 0
        },
        {
          id: "gaps_identification",
          description: "Fills gaps as necessary to ensure success of the work and team",
          score: 0
        },
        {
          id: "stakeholder_management",
          description: "Effectively escalates to project lead and/or stakeholder as necessary. Can effectively stakeholder potential solutions",
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
          id: "guidance_needs",
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

  const [overallScore, setOverallScore] = useState<number>(0);
  const [qualitativeNotes, setQualitativeNotes] = useState<string>("");

  // Update scores and recalculate averages
  const updateScore = (sectionIndex: number, criterionIndex: number, newScore: number): void => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].criteria[criterionIndex].score = newScore;
      
      // Calculate section average
      const sectionScores = newSections[sectionIndex].criteria.map(c => c.score);
      newSections[sectionIndex].averageScore = 
        sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
      
      return newSections;
    });
  };

  // Update overall score when section scores change
  useEffect(() => {
    const newOverallScore = 
      sections.reduce((sum, section) => sum + section.averageScore, 0) / sections.length;
    setOverallScore(newOverallScore);
  }, [sections]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 p-6 bg-yellow-100 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Product Designer II</h1>
        <p className="text-gray-600 mt-2">
          Assessment for the Product Designer II role level
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
                <p className="text-sm text-gray-600 mb-2">
                  {criterion.description}
                </p>
                
                <ScoreSlider
                  value={criterion.score}
                  onChange={(value: number) => 
                    updateScore(sectionIndex, criterionIndex, value)
                  }
                  min={0}
                  max={5}
                  step={0.5}
                  showLabels={true}
                />
              </div>
            ))}
          </div>
          
          {/* Section score */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {section.title} Score
              </span>
              <span className="text-sm font-bold text-gray-900">
                {section.averageScore.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Summary section */}
      <div className="mb-8 bg-yellow-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Summary - Product Designer II
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
          
          <div className="pt-2 mt-2 border-t border-yellow-200">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900">Overall Score</span>
              <span className="text-gray-900">{overallScore.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Qualitative notes */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Qualitative Notes
        </h2>
        <textarea
          className="w-full h-32 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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

export default ProductDesignerIIAssessment;