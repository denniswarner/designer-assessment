// File: src/app/assessment/[page]/page.tsx
// This is our special page that handles all assessment steps (1-8)
// When someone visits /assessment/1, /assessment/2, etc., this page will show the right content

'use client'

import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

// This function tells us what content to show for each page number
function getPageContent(pageNumber: number) {
  const pages = {
    1: {
      title: 'Product Designer',
      description: 'Basic competency assessment for Product Designer role'
    },
    2: {
      title: 'Product Designer II',
      description: 'Advanced competency assessment for Product Designer II role'
    },
    3: {
      title: 'Senior Product Designer',
      description: 'Leadership and technical assessment for Senior Product Designer'
    },
    4: {
      title: 'Senior Product Designer II',
      description: 'Advanced leadership assessment for Senior Product Designer II'
    },
    5: {
      title: 'Principal Product Designer',
      description: 'Strategic assessment for Principal Product Designer'
    },
    6: {
      title: 'Principal Product Designer II',
      description: 'Advanced strategic assessment for Principal Product Designer II'
    },
    7: {
      title: 'Review Your Answers',
      description: 'Review and confirm your assessment responses'
    },
    8: {
      title: 'Submit Assessment',
      description: 'Final review and submission'
    }
  }
  return pages[pageNumber as keyof typeof pages]
}

// This is our main page component
export default function AssessmentPage({
  params
}: {
  params: { page: string }
}) {
  const router = useRouter()
  const pageNumber = parseInt(params.page)
  
  // Make sure we have a valid page number
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 8) {
    notFound()
  }

  const pageContent = getPageContent(pageNumber)

  // Functions to handle navigation
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
        
        {/* This is where we'll add the actual assessment content later */}
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
          Assessment content for {pageContent.title} will go here
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousPage}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Previous
        </button>

        {pageNumber === 8 ? (
          <button
            onClick={() => alert('Assessment completed! This is a placeholder.')}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Assessment
          </button>
        ) : (
          <button
            onClick={goToNextPage}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}