'use client'

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { RestaurantOSCaseStudy } from '@/data/restaurantos-case'

const EASE = [0.22, 1, 0.36, 1]

interface RetrospectiveStageProps {
  data: RestaurantOSCaseStudy['retrospective']
}

/**
 * Stage 4 — What's Next.
 * The honesty section, framed forward-looking rather than apologetic:
 * limitations chosen for being technically interesting, lessons framed
 * as day-one next-project discipline, and a confident closing line.
 */
export default function RetrospectiveStage({ data }: RetrospectiveStageProps) {
  return (
    <div className="p-6 sm:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="section-label">Stage 4 · Retrospective</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">{data.title}</h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mt-3 max-w-2xl">
          {data.intro}
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {/* Known limitations */}
        <GlassCard hover={false} className="p-6 sm:p-8 h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <h4 className="text-white font-semibold">Known limitations</h4>
          </div>
          <ul className="space-y-4">
            {data.limitations.map((lim) => (
              <li key={lim} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="text-amber-400/70 mt-0.5 flex-shrink-0">—</span>
                {lim}
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* What's carrying forward */}
        <GlassCard hover={false} className="p-6 sm:p-8 h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <h4 className="text-white font-semibold">Carrying forward</h4>
          </div>
          <ul className="space-y-4">
            {data.forwardLessons.map((lesson) => (
              <li key={lesson} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="text-emerald-400/70 mt-0.5 flex-shrink-0">→</span>
                {lesson}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        className="mt-8 p-6 sm:p-10 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
      >
        <p className="text-lg sm:text-xl italic text-slate-200 leading-relaxed">
          “{data.closingLine}”
        </p>
      </motion.div>
    </div>
  )
}