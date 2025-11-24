import Link from 'next/link'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h1 className="text-4xl font-normal text-[#60a5fa] mb-2">
                Your Name
              </h1>
              <p className="text-base text-white mb-1">
                Software engineer — <span className="text-[#fbbf24]">AI tooling & scalable full-stack systems</span>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-normal text-[#60a5fa] mb-3">
                About
              </h2>
              <p className="text-sm text-white leading-relaxed mb-3">
                I'm a full-stack engineer with a passion for creating elegant solutions 
                to complex problems. I enjoy working with modern technologies and 
                building applications that make a difference.
              </p>
              <p className="text-sm text-white leading-relaxed">
                Key technologies: <span className="text-[#86efac]">Python</span>, <span className="text-[#86efac]">TypeScript</span>, <span className="text-[#86efac]">React/Next.js</span>, <span className="text-[#86efac]">Postgres</span>, <span className="text-[#86efac]">Docker</span>, <span className="text-[#86efac]">AWS</span>
              </p>
            </div>

            <div>
              <p className="text-sm text-white mb-4">
                Would love to collaborate or chat! Reach me at <a href="mailto:your@email.com" className="text-[#fb923c] hover:underline">your@email.com</a>
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-[#60a5fa] transition-colors">📧</a>
                <a href="#" className="text-white hover:text-[#60a5fa] transition-colors">📱</a>
                <a href="#" className="text-white hover:text-[#60a5fa] transition-colors">🔗</a>
                <a href="#" className="text-white hover:text-[#60a5fa] transition-colors">💼</a>
              </div>
            </div>
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/projects"
                className="text-sm text-[#fb923c] hover:underline inline-flex items-center gap-1"
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Graphic */}
      <div className="mt-16 w-full h-24 bg-gradient-to-b from-[#0a0a0a] to-[#14b8a6] opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="#14b8a6" opacity="0.3"/>
        </svg>
      </div>
    </div>
  )
}

