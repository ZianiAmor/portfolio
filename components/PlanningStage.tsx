'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { RestaurantOSCaseStudy } from '@/data/restaurantos-case'

const EASE = [0.22, 1, 0.36, 1]

const STACK_GROUPS = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'realtime', label: 'Real-time' },
  { key: 'infra', label: 'Infra' },
] as const

interface PlanningStageProps {
  data: RestaurantOSCaseStudy['planning']
}

export default function PlanningStage({ data }: PlanningStageProps) {
  const [archFailed, setArchFailed] = useState(false)

  return (
    <div className="p-6 sm:p-12 space-y-6">
      {/* ——— Header ——— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="section-label">Stage 2 · Thinking before code</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Planning &amp; Requirements
        </h2>
      </motion.div>

      {/* ——— Problem Framing (full width card) ——— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
      >
        <GlassCard hover={false} className="p-6 sm:p-8">
          <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
            The Problem Framing
          </h4>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-4xl">
            {data.problemFraming}
          </p>
        </GlassCard>
      </motion.div>

      {/* ——— Architecture Diagram (full width, LARGE) ——— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="w-full"
      >
        <GlassCard hover={false} glow={false} className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-500">
              Architecture Diagram
            </h4>
            <span className="text-[0.55rem] uppercase tracking-wider text-slate-600">
              Click to expand
            </span>
          </div>

          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0b]">
            {!archFailed && data.architectureImage ? (
              <Image
                src={data.architectureImage}
                alt="Architecture diagram – RestaurantOS system flow"
                fill
                sizes="100vw"
                className="object-contain p-2"
                onError={() => setArchFailed(true)}
                priority
              />
            ) : (
              /* ——— Enhanced placeholder ——— */
              <div className="w-full h-full bg-gradient-to-br from-slate-900/90 to-slate-800/60 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm sm:text-base font-mono text-slate-400">
                  <span className="text-cyan-400 font-medium">Client</span>
                  <span className="text-slate-600">──►</span>
                  <span className="text-violet-400 font-medium">Express API</span>
                  <span className="text-slate-600">──►</span>
                  <span className="text-amber-400 font-medium">PostgreSQL</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono text-slate-500">
                  <span>└──►</span>
                  <span className="text-emerald-400 font-medium">Pusher</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">private channels</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full border border-white/5 text-[0.55rem] uppercase tracking-wider text-slate-500 bg-white/[0.02]">
                    Cloudinary
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/5 text-[0.55rem] uppercase tracking-wider text-slate-500 bg-white/[0.02]">
                    Brevo
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-white/5 text-[0.55rem] uppercase tracking-wider text-slate-500 bg-white/[0.02]">
                    cron-job.org
                  </span>
                </div>
                <p className="text-[0.55rem] uppercase tracking-wider text-slate-600 mt-2">
                  {data.architectureImage || '/images/architecture.png · not found'}
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            {data.architectureCaption || 'Five roles, one API. The Next.js client talks to a single Express API behind role-guarded middleware; Prisma owns PostgreSQL; Pusher pushes state down private channels the moment a transaction commits. Cloudinary, Brevo, and cron-job.org hang off the edges — none of them touch the core loop.'}
          </p>
        </GlassCard>
      </motion.div>

      {/* ——— Tech Stack ——— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
      >
        <GlassCard hover={false} className="p-6 sm:p-8">
          <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-5">Tech Stack</h4>
          <div className="space-y-4">
            {STACK_GROUPS.map((g) => (
              <div key={g.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[0.62rem] uppercase tracking-wider text-slate-500 w-24 flex-shrink-0">
                  {g.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.stack[g.key].map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* ——— Key Design Decisions ——— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {data.decisions.map((d, i) => (
          <GlassCard key={d.title} hover={false} delay={i * 0.04} className="p-6">
            <h4 className="text-white font-semibold text-base flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5 text-xs leading-5">◆</span>
              {d.title}
            </h4>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">{d.reasoning}</p>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  )
}