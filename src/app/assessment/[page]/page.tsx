'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { useUser } from '@/context/UserContext'
import PageHeader from '@/components/PageHeader'
import NameDisplay from '@/components/NameDisplay'
import ProductDesignerAssessment from '@/components/ProductDesignerAssessment'
import ProductDesignerIIAssessment from '@/components/ProductDesignerIIAssessment'
import SeniorProductDesignerAssessment from '@/components/SeniorProductDesignerAssessment'
import SeniorProductDesignerIIAssessment from '@/components/SeniorProductDesignerIIAssessment'
import PrincipalProductDesignerAssessment from '@/components/PrincipalProductDesignerAssessment'
import PrincipalProductDesignerIIAssessment from '@/components/PrincipalProductDesignerIIAssessment'
import AssessmentSummary from '@/components/AssessmentSummary'

// This interface defines what each page's content should look like
interface PageContent {
  title: string
  description: string
}

// This defines all the possible pages in our assessment
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
    }
  }
  return pages[pageNumber] || notFound()
}

// Main page component
export default function AssessmentPage({
  params
}: {
  params: Promise<{ page: string }>
}) {
  // Initialize our router and get the current page number
  const resolvedParams = use(params)
  const pageNumber = parseInt(resolvedParams.page)
  const router = useRouter()
  const { setFullName, fullName } = useUser()
  
  // Set up our form state
  const [formData, setFormData] = useState({
    assessmentType: 'self',
    fullName: fullName || '',
    email: '',
    managerName: '',
    managerEmail: ''
  })

  useEffect(() => {
    if (fullName) {
      setFormData(prev => ({ ...prev, fullName }));
    }
  }, [fullName]);

  // If we have an invalid page number, show the 404 page
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 8) {
    notFound()
  }

  // Get the content for the current page
  const pageContent = getPageContent(pageNumber)

  // Handle navigation between pages
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

  // Render the appropriate content for the current page
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

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => {
                  const newName = e.target.value;
                  setFormData(prev => ({ ...prev, fullName: newName }));
                  setFullName(newName);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

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
    
    if (pageNumber === 2) {
      return (
        <>
          <NameDisplay />
          <ProductDesignerAssessment />
        </>
      )
    }
    
    if (pageNumber === 3) {
      return (
        <>
          <NameDisplay />
          <ProductDesignerIIAssessment />
        </>
      )
    }

    if (pageNumber === 4) {
      return (
        <>
          <NameDisplay />
          <SeniorProductDesignerAssessment />
        </>
      )
    }

    if (pageNumber === 5) {
      return (
        <>
          <NameDisplay />
          <SeniorProductDesignerIIAssessment />
        </>
      )
    }

    if (pageNumber === 6) {
      return (
        <>
          <NameDisplay />
          <PrincipalProductDesignerAssessment />
        </>
      )
    }

    if (pageNumber === 7) {
      return (
        <>
          <NameDisplay />
          <PrincipalProductDesignerIIAssessment />
        </>
      )
    }

    if (pageNumber === 8) {
      return (
        <>
          <NameDisplay />
          <AssessmentSummary />
        </>
      )
    }

    return (
      <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
        Assessment content for page {pageNumber} will go here
      </div>
    )
  }

  // The main page layout
  return (
    <div className="w-full">
      <PageHeader />
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8 pt-6">
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
          {renderAssessmentContent()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pb-10">
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
    </div>
  )
}