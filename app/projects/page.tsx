import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="mb-16">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-3">
            Projects
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            A collection of projects I've worked on, from web applications to 
            open-source contributions.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

