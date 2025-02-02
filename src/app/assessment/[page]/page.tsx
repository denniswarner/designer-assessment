// File: src/app/assessment/[page]/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { notFound } from 'next/navigation'
import { use } from 'react'
import ProductDesignerAssessment from '@/components/ProductDesignerAssessment'
import ProductDesignerIIAssessment from '@/components/ProductDesignerIIAssessment'
import SeniorProductDesignerAssessment from '@/components/SeniorProductDesignerAssessment'




// Define the page content interface
interface PageContent {
  title: string;
  description: string;
}

// This function provides the content for each assessment page
function getPageContent(pageNumber: number): PageContent {
  const pages: Record<number, PageContent> = {
    1: {
      title: 'Assessment Information',
      description: 'Please select the type of assessment you would like to complete.'
    },
    2: {
      title: 'Product Designer',
      description: 'Basic competency assessment for Product Designer role'
    },
    3: {
      title: 'Product Designer II',
      description: 'Advanced competency assessment for Product Designer II role'
    },
    4: {
      title: 'Senior Product Designer',
      description: 'Leadership and technical assessment for Senior Product Designer'
    },
    5: {
      title: 'Senior Product Designer II',
      description: 'Advanced leadership assessment for Senior Product Designer II'
    },
    6: {
      title: 'Principal Product Designer',
      description: 'Strategic assessment for Principal Product Designer'
    },
    7: {
      title: 'Principal Product Designer II',
      description: 'Advanced strategic assessment for Principal Product Designer II'
    },
    8: {
      title: 'Review Your Answers',
      description: 'Review and confirm your assessment responses'
    },
    9: {
      title: 'Submit Assessment',
      description: 'Final review and submission of your assessment'
    }
  }
  return pages[pageNumber] || notFound()
}

export default function AssessmentPage({
  params
}: {
  params: Promise<{ page: string }>
}) {
  // Properly unwrap the params using React.use()
  const resolvedParams = use(params)
  const pageNumber = parseInt(resolvedParams.page)
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    assessmentType: 'self',
    fullName: '',
    email: '',
    managerName: '',
    managerEmail: ''
  })

  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 8) {
    notFound()
  }

  const pageContent = getPageContent(pageNumber)

  // Navigation handlers
  const goToNextPage = () => {
    if (pageNumber < 8) {
      router.push(`/assessment/${pageNumber + 1}`)
    }
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      router.push(`/assessment/${pageNumber - 1}`)
    } else {
      router.push('/')
    }
  }

  // Render assessment content based on page number
  const renderAssessmentContent = () => {
    if (pageNumber === 1) {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Assessment Type</h3>
            
            <RadioGroup.Root
              value={formData.assessmentType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, assessmentType: value }))}
              className="space-y-3"
            >
              {/* Self Assessment Option */}
              <div className="flex items-center">
                <RadioGroup.Item
                  value="self"
                  id="self"
                  className="w-4 h-4 rounded-full border border-gray-300 mr-2 relative
                           data-[state=checked]:border-blue-600 data-[state=checked]:border-2"
                >
                  <RadioGroup.Indicator className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="self" className="text-gray-700">
                  Self Assessment
                </label>
              </div>

              {/* Manager Assessment Option */}
              <div className="flex items-center">
                <RadioGroup.Item
                  value="manager"
                  id="manager"
                  className="w-4 h-4 rounded-full border border-gray-300 mr-2 relative
                           data-[state=checked]:border-blue-600 data-[state=checked]:border-2"
                >
                  <RadioGroup.Indicator className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="manager" className="text-gray-700">
                  Manager Assessment
                </label>
              </div>
            </RadioGroup.Root>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            {/* Conditional Manager Fields */}
            {formData.assessmentType === 'self' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="managerName" className="block text-lg font-medium text-gray-700">
                    Manager's Name
                  </label>
                  <input
                    type="text"
                    id="managerName"
                    value={formData.managerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, managerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your manager's name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="managerEmail" className="block text-lg font-medium text-gray-700">
                    Manager's Email
                  </label>
                  <input
                    type="email"
                    id="managerEmail"
                    value={formData.managerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, managerEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your manager's email"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )
    }
    
   // For page 2, show the Product Designer assessment
   if (pageNumber === 2) {
    return <ProductDesignerAssessment />
  } else if (pageNumber === 3) {
    return <ProductDesignerIIAssessment />
  } else if (pageNumber === 4) {
    return <SeniorProductDesignerAssessment />
  }

// For other pages, show a placeholder
return (
  <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
    Assessment content for page {pageNumber} will go here
  </div>
)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(pageNumber / 8) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          Step {pageNumber} of 8
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{pageContent.title}</h2>
        <p className="text-gray-600 mb-8">{pageContent.description}</p>
        
        {renderAssessmentContent()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousPage}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Previous
        </button>

        <button
          onClick={goToNextPage}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}