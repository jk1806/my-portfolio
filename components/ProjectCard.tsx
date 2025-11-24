import { Project } from '@/types/project'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="text-base font-normal text-gray-900 dark:text-gray-100">
              {project.title}
            </h2>
            <div className="flex items-center gap-4 flex-shrink-0">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                >
                  GitHub
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                >
                  Live
                </Link>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-normal mb-1.5">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-2.5">
            {project.technologies.map((tech, index) => (
              <span
                key={tech}
                className="text-xs text-gray-500 dark:text-gray-500"
              >
                {tech}{index < project.technologies.length - 1 && ','}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

