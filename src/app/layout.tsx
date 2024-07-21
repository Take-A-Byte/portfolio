import '@app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './navbar/page'

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
        <NavBar />
        {children}
      </body>
    </html>
  )
}
