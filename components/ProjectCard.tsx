import { Project } from '@/types/project'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
}

const getTagColors = (color?: 'green' | 'blue' | 'purple') => {
  switch (color) {
    case 'green':
      return 'bg-[#065f46] text-[#86efac]'
    case 'blue':
      return 'bg-[#1e3a8a] text-[#93c5fd]'
    case 'purple':
      return 'bg-[#581c87] text-[#c084fc]'
    default:
      return 'bg-[#065f46] text-[#86efac]'
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const tagColors = getTagColors(project.tagColor)

  return (
    <article>
      <div className="flex gap-4">
        {/* Project Image */}
        {project.imageUrl ? (
          <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden bg-gray-800">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-20 h-20 rounded bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
            Preview
          </div>
        )}

        {/* Project Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="text-base font-normal text-white flex items-center gap-1">
              {project.title}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              )}
            </h2>
          </div>
          <p className="text-sm text-white leading-normal mb-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`text-xs px-2 py-0.5 rounded ${tagColors} font-medium`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className={`text-xs px-2 py-0.5 rounded ${tagColors} font-medium`}>
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

