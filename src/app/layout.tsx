// File: src/app/layout.tsx
// This is the root layout component that wraps all pages
// It contains the global header and structure that appears on every page

import './globals.css'
import { Inter } from 'next/font/google'

// Load Inter font for consistent typography
const inter = Inter({ subsets: ['latin'] })

// Define page metadata (title, description)
export const metadata = {
  title: 'Product Design Assessment',
  description: 'Comprehensive assessment system for evaluating product designer competencies',
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global header - appears on every page */}
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-xl font-semibold">
              Product Design - Competency Assessment
            </h1>
          </div>
        </header>

        {/* Main content area - where page content appears */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}