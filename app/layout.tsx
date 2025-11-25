import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Jeevesh Srivastava | Embedded Systems Engineer',
  description: 'Expert in embedded systems, SoC design, networking (802.11, L2/L3 OSI), automotive systems, and security technologies. Specialized in embedded C/C++, ARM Cortex, RTOS, and firmware development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}

