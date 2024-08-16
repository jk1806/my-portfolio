'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  const [isVerified, setIsVerified] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-[#60a5fa]">
            Projects
          </h1>
        </div>

        {!isVerified ? (
          <div className="flex items-center gap-3 p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
            <input
              type="checkbox"
              id="human-verify"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-[#60a5fa] focus:ring-2 focus:ring-[#60a5fa] cursor-pointer"
            />
            <label
              htmlFor="human-verify"
              className="text-sm text-gray-300 cursor-pointer select-none"
            >
              I'm not a robot
            </label>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
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

