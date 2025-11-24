'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-base font-normal text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Portfolio
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`text-sm font-normal transition-colors ${
                isActive('/')
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-normal transition-colors ${
                isActive('/projects')
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
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

