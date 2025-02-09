// File: src/components/AssessmentSummary/AssessmentSummary.tsx
import React from 'react';

// Define our interfaces for type safety
interface SectionScore {
  title: string;
  score: number;
}

interface RoleSummary {
  title: string;
  themeColor: string;
  sections: SectionScore[];
  qualitativeNotes: string;
  overallScore: number;
}

const AssessmentSummary = () => {
  // Sample data structure for all role levels
  const roleSummaries: RoleSummary[] = [
    {
      title: "Product Designer",
      themeColor: "bg-blue-100",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    },
    {
      title: "Product Designer II",
      themeColor: "bg-blue-200",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    },
    {
      title: "Senior Product Designer",
      themeColor: "bg-yellow-100",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    },
    {
      title: "Senior Product Designer II",
      themeColor: "bg-yellow-200",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    },
    {
      title: "Principal Product Designer",
      themeColor: "bg-purple-100",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    },
    {
      title: "Principal Product Designer II",
      themeColor: "bg-purple-200",
      sections: [
        { title: "Strategic Thinking & Domain Expertise", score: 0.0 },
        { title: "Craft & Quality", score: 0.0 },
        { title: "Leadership, Communication & Collaboration", score: 0.0 },
        { title: "Team Culture", score: 0.0 },
        { title: "Independence & Growth Mindset", score: 0.0 }
      ],
      qualitativeNotes: "",
      overallScore: 0.0
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Role summaries */}
      {roleSummaries.map((role) => (
        <div key={role.title} className="mb-8">
          {/* Role header */}
          <div className={`p-4 rounded-t-lg ${role.themeColor}`}>
            <h2 className="text-xl font-semibold text-gray-800">{`Summary - ${role.title}`}</h2>
          </div>

          {/* Score sections */}
          <div className="bg-white p-6 shadow-sm">
            {role.sections.map((section) => (
              <div key={section.title} className="flex justify-between py-2 text-gray-800">
                <span className="text-gray-600">{section.title}</span>
                <span className="font-medium">{section.score.toFixed(1)}</span>
              </div>
            ))}

            {/* Overall score */}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Overall Score</span>
                <span>{role.overallScore.toFixed(1)}</span>
              </div>
            </div>

            {/* Qualitative notes */}
            <div className="mt-6">
              <h3 className="font-medium mb-2 text-gray-800">Qualitative Notes</h3>
              <textarea
                className="w-full h-24 p-2 border rounded-lg text-gray-700 bg-gray-50"
                placeholder="Enter specific examples, areas of improvement and development goals for this level"
                value={role.qualitativeNotes}
                readOnly
              />
            </div>
          </div>
        </div>
      ))}

      {/* Final score */}
      <div className="bg-green-600 text-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Final Score</span>
          <span className="text-xl font-bold">0.0</span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSummary;