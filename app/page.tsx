import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-lg font-normal text-gray-900 dark:text-gray-100 mb-3">
            Software Engineer
          </h1>
          <p className="text-sm leading-normal text-gray-600 dark:text-gray-400 mb-4">
            Building modern web applications and digital experiences. 
            Passionate about clean code, user experience, and continuous learning.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-12 lg:px-8 border-t border-gray-200 dark:border-gray-900">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-lg font-normal text-gray-900 dark:text-gray-100 mb-3">
            About
          </h2>
          <div className="space-y-2.5 text-sm leading-normal text-gray-600 dark:text-gray-400">
            <p>
              I'm a software engineer with a passion for creating elegant solutions 
              to complex problems. I enjoy working with modern technologies and 
              building applications that make a difference.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

