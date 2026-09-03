export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  hero: string
  images: string[]
  tech: string[]
  category: 'Development' | 'Design' | '3D'
  features: string[]
  challenges: string[]
  status: string
  url: string | null
  github: string | null
}

export interface SkillGroup {
  title: string
  icon: string
  color: string
  description: string
  tags: string[]
}

export interface Article {
  id: string
  type: string
  readTime: string
  title: string
  description: string
}

export interface RenderItem {
  id: string
  title: string
  badge: string
  gradient: string
}