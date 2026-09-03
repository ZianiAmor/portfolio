import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Ziani Amor · Full-Stack Developer',
  description:
    'Portfolio of Ziani Amor — Full-Stack Developer building production-grade web applications with React, Next.js, Node.js, and TypeScript.',
  keywords: ['developer', 'full-stack', 'React', 'Next.js', 'Node.js', 'TypeScript', 'portfolio'],
  authors: [{ name: 'Ziani Amor' }],
  openGraph: {
    title: 'Ziani Amor · Full-Stack Developer',
    description: 'Building production-grade web applications',
    type: 'website',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="font-inter bg-dark-900 text-slate-200 antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}