export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  tagColor?: 'green' | 'blue' | 'purple'
  year?: string
  status?: 'in-development' | 'launched' | 'completed'
  madeFor?: string
  tagline?: string
  detailedDescription?: string[]
  startDate?: string
  endDate?: string
}

