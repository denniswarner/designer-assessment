// File: src/app/assessment/summary/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import AssessmentSummary from '@/components/AssessmentSummary/AssessmentSummary'

export default function SummaryPage() {
  const router = useRouter()

  // Handler for going back to previous page
  const handleBack = () => {
    router.push('/assessment/8')
  }

  // Handler for finishing the assessment
  const handleFinish = () => {
    // Here you would typically handle final submission
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Assessment Summary
        </h1>
        <p className="text-gray-300">
          Review your assessment scores across all role levels
        </p>
      </div>

      {/* Summary Component */}
      <AssessmentSummary />

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleFinish}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Finish Assessment
        </button>
      </div>
    </div>
  )
}