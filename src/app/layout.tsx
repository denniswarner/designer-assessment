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


        {/* Black background wrapper for main content */}
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  )
}