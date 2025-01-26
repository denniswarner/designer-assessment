// File: src/app/page.tsx
// This is our home page - the first thing visitors see when they come to our site.
// We need to import React because we're using JSX (the HTML-like syntax)

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Main welcome section */}
      <h2 className="text-2xl font-semibold mb-6">
        Welcome to the Product Design Assessment
      </h2>
      
      {/* White card containing our main content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Introduction text */}
        <p className="mb-6 text-gray-600">
          This assessment will help evaluate your product design competencies.
          The process includes 8 sections and takes about 30-45 minutes to complete.
        </p>
        
        {/* Instructions for users */}
        <div className="mb-8 text-left text-sm text-gray-600">
          <p className="font-medium mb-2">Before you begin:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You can save your progress and return later</li>
            <li>Take your time to provide thoughtful responses</li>
            <li>Have examples ready to support your assessments</li>
          </ul>
        </div>

        {/* Start button - this takes us to the first assessment page */}
        <Link 
          href="/assessment/1"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Assessment
        </Link>
      </div>
    </div>
  )
}