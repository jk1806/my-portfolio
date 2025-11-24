import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Jeevesh Srivastava | Embedded Systems Engineer',
  description: 'Expert in embedded systems & firmware development. Specialized in embedded C/C++, ARM Cortex, RTOS, IoT, and microcontrollers.',
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

