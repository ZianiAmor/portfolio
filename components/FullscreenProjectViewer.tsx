'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/types'

interface FullscreenProjectViewerProps {
  project: Project | null
  onClose: () => void
}

export default function FullscreenProjectViewer({ project, onClose }: FullscreenProjectViewerProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [heroFailed, setHeroFailed] = useState(false)

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/5 bg-dark-900/95 backdrop-blur-2xl shadow-2xl"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Hero image area */}
          <div className="relative w-full aspect-video bg-dark-800/50 overflow-hidden flex items-center justify-center">
            {project.hero && !heroFailed ? (
              <Image
                src={project.hero}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                onError={() => setHeroFailed(true)}
              />
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-2 opacity-30">◆</div>
                <p className="text-slate-600 text-xs uppercase tracking-widest">{project.title}</p>
              </div>
            )}

            {/* Image counter */}
            {project.images.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage
                        ? 'bg-cyan-400 w-6'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Title & tech */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <span className="tag">{project.status}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Tech badges */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-white/5 bg-white/[0.02] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-cyan-400 mt-0.5">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Challenges</h4>
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] text-sm text-slate-400 leading-relaxed"
                >
                  <span className="text-amber-400 font-medium">⚡ </span>
                  {c}
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}