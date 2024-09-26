import '@app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import NavBar from '@app/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Integrated Identities',
  description: 'Shantanu methikar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  )
}
