'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import Link from 'next/link'

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'in-development':
      return (
        <div className="w-5 h-5 rounded-full bg-[#60a5fa] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )
    case 'launched':
      return (
        <div className="w-5 h-5 rounded-full bg-[#14b8a6] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )
    case 'completed':
      return (
        <div className="w-5 h-5 rounded-full bg-[#86efac] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-[#14b8a6] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )
  }
}

const getStatusText = (status?: string) => {
  switch (status) {
    case 'in-development':
      return 'In Development'
    case 'launched':
      return 'Launched'
    case 'completed':
      return 'Completed'
    default:
      return 'Launched'
  }
}

const getTagColor = (index: number) => {
  const colors = [
    'bg-[#065f46] text-[#86efac]', // green
    'bg-[#581c87] text-[#c084fc]', // purple
    'bg-[#1e3a8a] text-[#93c5fd]', // blue
    'bg-[#7c2d12] text-[#fdba74]', // orange
    'bg-[#1e293b] text-[#cbd5e1]', // dark blue
  ]
  return colors[index % colors.length]
}

export default function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link href="/" className="text-red-500 hover:text-red-400 mb-6 inline-block">
          &lt; Back
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#60a5fa] mb-2">
            All Projects
          </h1>
          <p className="text-white text-lg">
            A complete archive of things I have built.
          </p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-800 text-sm text-gray-400 mb-2">
          <div className="col-span-1">YEAR</div>
          <div className="col-span-3">PROJECT</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-2">MADE FOR</div>
          <div className="col-span-4">BUILT WITH</div>
          <div className="col-span-1">LINK</div>
        </div>

        {/* Projects List */}
        <div className="space-y-1">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id
            return (
              <div key={project.id}>
                {/* Project Row */}
                <div
                  className="grid grid-cols-12 gap-4 py-4 px-2 hover:bg-[#1a1a1a] rounded cursor-pointer transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                >
                  {/* Year */}
                  <div className="col-span-1 flex items-center gap-2">
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">{project.year || '2024'}</span>
                  </div>

                  {/* Project Name */}
                  <div className="col-span-3">
                    <span className="text-white font-semibold">{project.title}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex items-center">
                    {getStatusIcon(project.status)}
                  </div>

                  {/* Made For */}
                  <div className="col-span-2">
                    <span className="text-white">{project.madeFor || 'Personal'}</span>
                  </div>

                  {/* Built With */}
                  <div className="col-span-4 flex flex-wrap items-center gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={tech}
                        className={`text-xs px-2 py-0.5 rounded font-medium ${getTagColor(idx)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-400 text-xs">+{project.technologies.length - 3} more</span>
                    )}
                  </div>

                  {/* Link */}
                  <div className="col-span-1 flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-[#60a5fa] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-[#60a5fa] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-2 pb-6 border-b border-gray-800 animate-fadeIn">
                    {project.tagline && (
                      <p className="text-white text-lg mb-4">{project.tagline}</p>
                    )}

                    <div className="flex items-center gap-3 mb-6">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'in-development' ? 'bg-[#1e3a8a] text-[#93c5fd]' :
                        project.status === 'launched' ? 'bg-[#065f46] text-[#86efac]' :
                        'bg-[#065f46] text-[#86efac]'
                      }`}>
                        {getStatusText(project.status)}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <span className="text-gray-400 text-sm">
                          {project.startDate || '2024'} - {project.endDate || 'Present'}
                        </span>
                      )}
                    </div>

                    {project.detailedDescription && project.detailedDescription.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-[#86efac] text-sm font-semibold mb-3">Description</h3>
                        <ul className="space-y-2 text-white text-sm">
                          {project.detailedDescription.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-gray-500 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!project.detailedDescription && (
                      <div className="mb-6">
                        <h3 className="text-[#86efac] text-sm font-semibold mb-3">Description</h3>
                        <p className="text-white text-sm">{project.description}</p>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-[#86efac] text-sm font-semibold mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-1 rounded font-medium ${getTagColor(idx)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[#86efac] text-sm font-semibold mb-3">Links</h3>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded border border-gray-800 text-white text-sm transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Repository
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded border border-gray-800 text-white text-sm transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit Site
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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
