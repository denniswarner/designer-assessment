// File: src/components/PrincipalProductDesignerAssessment/PrincipalProductDesignerAssessment.tsx
// Purpose: Assessment component for Principal Product Designer role evaluation
// Handles scoring, calculations, and layout for Principal PD specific criteria

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

const PrincipalProductDesignerAssessment = (): React.ReactElement => {
  // Initialize assessment sections with Principal PD specific criteria
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      title: "Strategic Thinking & Domain Expertise",
      criteria: [
        {
          id: "domain_expertise",
          description: "Has a deep understanding of title and escrow and real estate team roles, and is able to leverage individual team improvements to align to overall OKRs and KPIs.",
          score: 0
        },
        {
          id: "competitive_landscape",
          description: "Understands the competitive landscape and industry trends for their use case area that might fall inform product strategy and identify sustainable advantages.",
          score: 0
        },
        {
          id: "complex_challenges",
          description: "Can handle complex product challenges, often involving a strong understanding of technical, development, or business aspects",
          score: 0
        },
        {
          id: "requirements_understanding",
          description: "Deeply understands explicit requirements, frequently finds gaps of understanding or accurately listing trade-offs",
          score: 0
        },
        {
          id: "product_direction",
          description: "Develops and maintains a firm shared, and able to help start guiding it and narrow in from diverging directions using a thorough product and customer understanding",
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
          description: "Designs are consistently a shining example of completeness; people rarely need clarification on design details like hover states, edge cases, and screen sizes",
          score: 0
        },
        {
          id: "industry_patterns",
          description: "Deeply understands industry patterns, and can identify how and when they are effective. Only creates new ones as needed, validating them with research.",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Leadership, Communication, & Collaboration",
      criteria: [
        {
          id: "strategic_communication",
          description: "Starting to develop strategic communication skills vs. tactical communication.",
          score: 0
        },
        {
          id: "value_proposition",
          description: "Can effectively communicate product value proposition and capabilities.",
          score: 0
        },
        {
          id: "stakeholder_management",
          description: "Can think strategically about stakeholder/project management.",
          score: 0
        },
        {
          id: "business_value",
          description: "Can effectively tie the team's output to the business value it drives for the entire team to understand.",
          score: 0
        },
        {
          id: "peer_influence",
          description: "Can influence peers across the company on the value of research/design, user-centered thinking, and great UX.",
          score: 0
        },
        {
          id: "discipline_improvement",
          description: "Participates in efforts to improve the entire discipline.",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Team Culture",
      criteria: [
        {
          id: "facilitation",
          description: "Comfortably runs and facilitates research and design team processes effectively",
          score: 0
        },
        {
          id: "feedback",
          description: "Others actively seek their feedback, and listen to their guidance",
          score: 0
        },
        {
          id: "process_improvement",
          description: "Offers improvements to team processes like critiques and team meetings",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Independence & Growth Mindset",
      criteria: [
        {
          id: "independence",
          description: "Works independently in most areas, may escalate to more senior individuals",
          score: 0
        },
        {
          id: "mindset_management",
          description: "Knows and manages their triggers for fixed mindset",
          score: 0
        },
        {
          id: "learning",
          description: "Actively seeks out and applies lessons and inspiration from the success of others",
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
      {/* Header section with pink theme */}
      <div className="mb-8 p-6 bg-pink-100 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Principal Product Designer</h1>
        <p className="text-gray-600 mt-2">
          Assessment for the Principal Product Designer role level
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

      {/* Summary section with pink theme */}
      <div className="mb-8 bg-pink-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Summary - Principal Product Designer
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
          
          <div className="pt-2 mt-2 border-t border-pink-200">
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
          className="w-full h-32 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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

export default PrincipalProductDesignerAssessment;