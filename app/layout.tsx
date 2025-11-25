import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Jeevesh Srivastava | Embedded Systems Engineer',
  description: 'Expert in embedded systems with 2+ years experience. Specialized in SoC design, PCIe protocols, networking stacks (L2/L3/L4), 802.11 Wi-Fi, automotive systems (ISO 26262, ISO 21434, AUTOSAR), secure boot, RTOS, device drivers, wireless protocols (BLE, LoRaWAN, Zigbee, Thread, Matter), IoT protocols (MQTT, CoAP, QUIC), RF hardware, and manufacturing compliance. Technologies: Embedded C/C++, ARM Cortex, RTOS, Python, Linux Embedded.',
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

