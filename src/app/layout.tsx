import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'

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
        <UserProvider>
          <div className="min-h-screen bg-black">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}