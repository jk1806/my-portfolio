import { Project } from '@/types/project'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-12 border-b border-gray-100 dark:border-gray-900 last:border-0">
        <div className="flex-1">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {project.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs text-gray-500 dark:text-gray-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              GitHub
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Live
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

