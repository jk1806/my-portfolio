import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
            Software Engineer
          </h1>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            Building modern web applications and digital experiences. 
            Passionate about clean code, user experience, and continuous learning.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              View Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24 lg:px-8 border-t border-gray-100 dark:border-gray-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
            About
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
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

