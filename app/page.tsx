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
                Jeevesh Srivastava
              </h1>
              <p className="text-base text-white mb-1">
                Embedded Systems Engineer — <span className="text-[#fbbf24]">SoC, Networking, Automotive, Security & 802.11 Technologies</span>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-normal text-[#60a5fa] mb-3">
                About
              </h2>
              <p className="text-sm text-white leading-relaxed mb-3">
                Expert in embedded systems development with deep expertise across the entire embedded stack. 
                From low-level firmware to system architecture, I can handle anything embedded — hardware interfacing, 
                real-time systems, device drivers, and embedded software optimization.
              </p>
              <p className="text-sm text-white leading-relaxed mb-3">
                Specialized in <span className="text-[#86efac]">SoC (System-on-Chip)</span> design and development, 
                <span className="text-[#86efac]"> networking protocols</span> including <span className="text-[#86efac]">802.11 (Wi-Fi)</span> technologies, 
                <span className="text-[#86efac]"> L2/L3 OSI layers</span> implementation, <span className="text-[#86efac]">automotive embedded systems</span>, 
                and <span className="text-[#86efac]">security technologies</span> for embedded platforms.
              </p>
              <p className="text-sm text-white leading-relaxed">
                Core technologies: <span className="text-[#86efac]">Embedded C/C++</span>, <span className="text-[#86efac]">ARM Cortex</span>, <span className="text-[#86efac]">RTOS</span>, <span className="text-[#86efac]">SoC</span>, <span className="text-[#86efac]">802.11/Wi-Fi</span>, <span className="text-[#86efac]">Networking</span>, <span className="text-[#86efac]">Automotive</span>, <span className="text-[#86efac]">Security</span>, <span className="text-[#86efac]">IoT</span>, <span className="text-[#86efac]">Microcontrollers</span>
              </p>
            </div>

            <div>
              <p className="text-sm text-white mb-4">
                Would love to collaborate or chat! Reach me at <a href="mailto:jeeveshsrivastava18@gmail.com" className="text-[#fb923c] hover:underline">jeeveshsrivastava18@gmail.com</a>
              </p>
              <div className="flex gap-4 mb-2">
                <a href="mailto:jeeveshsrivastava18@gmail.com" className="text-white hover:text-[#60a5fa] transition-colors" title="Email">📧</a>
                <a href="tel:+919211595966" className="text-white hover:text-[#60a5fa] transition-colors" title="Phone">📱</a>
                <a href="https://www.linkedin.com/in/jeevesh9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#60a5fa] transition-colors" title="LinkedIn">💼</a>
                <a href="https://github.com/jk1806" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#60a5fa] transition-colors" title="GitHub">🔗</a>
              </div>
              <p className="text-xs text-gray-400">
                Phone: <a href="tel:+919211595966" className="text-[#fb923c] hover:underline">+91 9211595966</a>
              </p>
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

