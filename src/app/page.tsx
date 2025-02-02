// File: src/app/page.tsx
// Purpose: Welcome page component - first page users see when accessing the application
// This component renders the welcome message and initial instructions

import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Welcome heading */}
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Welcome to the Product Design Assessment
        </h2>

        {/* White card container */}
        <div className="bg-white rounded-2xl p-8 text-gray-700">
          {/* Description text */}
          <p className="text-center text-lg mb-8">
            This assessment will help evaluate your product design competencies.
            The process includes 8 sections and takes about 30-45 minutes to
            complete.
          </p>

          {/* Instructions section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Before you begin:</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• You can save your progress and return later</li>
              <li>• Take your time to provide thoughtful responses</li>
              <li>• Have examples ready to support your assessments</li>
            </ul>
          </div>

          {/* Start button */}
          <div className="text-center">
            <Link
              href="/assessment/1"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}