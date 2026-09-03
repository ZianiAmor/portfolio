'use client'

import { useState } from 'react'
import Image from 'next/image'
import GlassCard from './GlassCard'
import { Project } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const delay = (index % 3) * 0.1
  const [thumbFailed, setThumbFailed] = useState(false)

  return (
    <GlassCard
      delay={delay}
      className="overflow-hidden cursor-pointer group hover:border-cyan-400/20"
      onClick={() => onOpen(project)}
    >
      {/* Image area */}
      <div
        className={`h-48 w-full bg-gradient-to-br ${getGradient(project.category)} relative overflow-hidden`}
      >
        {project.thumbnail && !thumbFailed ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            onError={() => setThumbFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-1 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                ◆
              </div>
              <span className="text-[0.55rem] uppercase tracking-widest opacity-40 block">
                {project.status}
              </span>
            </div>
          </div>
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-white font-semibold text-base leading-snug">
            {project.title}
          </h3>
          <span className="tag flex-shrink-0 ml-2">{project.status}</span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag text-[0.6rem]">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag text-[0.6rem]">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* View indicator – appears on hover */}
        <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-medium text-cyan-400 flex items-center gap-1">
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </GlassCard>
  )
}

function getGradient(category: string): string {
  switch (category) {
    case 'Development':
      return 'from-cyan-500/20 to-violet-500/20'
    case 'Design':
      return 'from-rose-500/20 to-amber-500/20'
    case '3D':
      return 'from-emerald-500/20 to-cyan-500/20'
    default:
      return 'from-cyan-500/20 to-violet-500/20'
  }
}