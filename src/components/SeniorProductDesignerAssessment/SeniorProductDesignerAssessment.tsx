// File: src/components/SeniorProductDesignerAssessment/SeniorProductDesignerAssessment.tsx
// Purpose: Assessment component for Senior Product Designer role evaluation
// This component manages scoring and layout for Senior PD specific criteria

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

const SeniorProductDesignerAssessment = (): React.ReactElement => {
  // Initialize sections with Senior PD specific criteria from the image
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      title: "Strategic Thinking & Domain Expertise",
      criteria: [
        {
          id: "domain_understanding",
          description: "Has a deep understanding of title and escrow and real estate team roles, and is able to leverage individual team improvements to align to overall OKRs and mission.",
          score: 0
        },
        {
          id: "competitive_landscape",
          description: "Understands the competitive landscape and industry trends for their use case area that might inform product strategy and identify sustainable advantages.",
          score: 0
        },
        {
          id: "product_challenges",
          description: "Can handle complex product challenges, often involving a strong understanding of technical, development, or business aspects",
          score: 0
        },
        {
          id: "requirements_handling",
          description: "Deeply understands project requirements, frequently being able to gain of understanding or accurately listing trade-offs",
          score: 0
        },
        {
          id: "guidance_provision",
          description: "Guidance and mentorship is often effective, and able to help start guidance and help chart directions using a thorough product and customer understanding",
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
          id: "pattern_understanding",
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
          description: "Starting to develop strategic communication skills vs. tactical communication",
          score: 0
        },
        {
          id: "value_communication",
          description: "Can effectively communicate product value proposition and capabilities",
          score: 0
        },
        {
          id: "stakeholder_management",
          description: "Can think strategically about stakeholder/project management",
          score: 0
        },
        {
          id: "business_alignment",
          description: "Can effectively tie the team's output to the business value it drives for the entire team to understand",
          score: 0
        },
        {
          id: "peer_influence",
          description: "Can influence peers across the company on the value of research/design, user-centered thinking, and great UX",
          score: 0
        },
        {
          id: "discipline_improvement",
          description: "Participates in efforts to improve the entire discipline",
          score: 0
        }
      ],
      averageScore: 0
    },
    {
      title: "Team Culture",
      criteria: [
        {
          id: "process_facilitation",
          description: "Comfortably runs and facilitates research and design team processes effectively",
          score: 0
        },
        {
          id: "feedback_handling",
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
          id: "fixed_mindset",
          description: "Knows and manages their triggers for fixed mindset",
          score: 0
        },
        {
          id: "learning_application",
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
      
      // Calculate section average
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
      {/* Header section with yellow theme for Senior PD */}
      <div className="mb-8 p-6 bg-yellow-100 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Senior Product Designer</h1>
        <p className="text-gray-600 mt-2">
          Assessment for the Senior Product Designer role level
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

      {/* Summary section */}
      <div className="mb-8 bg-yellow-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Summary - Senior Product Designer
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

export default SeniorProductDesignerAssessment;