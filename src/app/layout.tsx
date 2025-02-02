// File: src/app/layout.tsx
// Purpose: Root layout that wraps all pages in the application
// This component provides the basic page structure and global styles

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Product Design Assessment',
  description: 'Comprehensive assessment system for evaluating product designer competencies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global header - appears on every page */}
        <header className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-xl font-semibold">
            Product Design - Competency Assessment
          </h1>
        </header>

        {/* Black background wrapper for main content */}
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  )
}