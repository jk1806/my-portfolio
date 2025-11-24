import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-lg font-normal text-gray-900 dark:text-gray-100">
            Projects
          </h1>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

