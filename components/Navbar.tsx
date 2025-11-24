'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-sm font-normal text-white hover:text-[#60a5fa] transition-colors"
            >
              Portfolio
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`text-sm font-normal transition-colors ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-normal transition-colors ${
                isActive('/projects')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

