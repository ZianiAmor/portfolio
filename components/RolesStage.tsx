'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { UtensilsCrossed, ChefHat, Users, Bike, ShieldCheck, Video, Image as ImageIcon } from 'lucide-react'
import GlassCard from './GlassCard'
import { RestaurantOSCaseStudy, RoleKey } from '@/data/restaurantos-case'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1]

const ROLE_ACCENTS: Record<RoleKey, string> = {
  customer: 'from-cyan-500/15 to-violet-500/15',
  cook: 'from-amber-500/15 to-orange-500/15',
  service: 'from-violet-500/15 to-cyan-500/15',
  delivery: 'from-emerald-500/15 to-teal-500/15',
  admin: 'from-rose-500/15 to-amber-500/15',
}

const ROLE_ICONS: Record<RoleKey, React.ElementType> = {
  customer: UtensilsCrossed,
  cook: ChefHat,
  service: Users,
  delivery: Bike,
  admin: ShieldCheck,
}

const ROLE_GLOW: Record<RoleKey, string> = {
  customer: 'shadow-[0_0_24px_rgba(34,211,238,0.25)]',
  cook: 'shadow-[0_0_24px_rgba(251,191,36,0.25)]',
  service: 'shadow-[0_0_24px_rgba(167,139,250,0.25)]',
  delivery: 'shadow-[0_0_24px_rgba(52,211,153,0.25)]',
  admin: 'shadow-[0_0_24px_rgba(251,113,133,0.25)]',
}

interface RolesStageProps {
  data: RestaurantOSCaseStudy['roles']
  activeRole: RoleKey
  activeSection: number
  onRoleChange: (key: RoleKey) => void
  onSectionChange: (index: number) => void
}

export default function RolesStage({
  data,
  activeRole,
  activeSection,
  onRoleChange,
  onSectionChange,
}: RolesStageProps) {
  const role = data[activeRole]
  const safeSection = Math.min(activeSection, role.sections.length - 1)
  const section = role.sections[safeSection]

  return (
    <div className="p-6 sm:p-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="section-label">Stage 3 · Role Showcase</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">{data.title}</h2>
      </motion.div>

      {/* Role switcher — icon dock */}
      <div
        role="tablist"
        aria-label="Roles"
        className="mt-8 flex gap-1 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit mx-auto sm:mx-0"
      >
        {data.order.map((key) => {
          const Icon = ROLE_ICONS[key]
          const isActive = activeRole === key
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onRoleChange(key)}
              className="relative px-3.5 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="role-indicator"
                  className={cn(
                    'absolute inset-0 rounded-xl bg-gradient-to-br border border-white/10',
                    ROLE_ACCENTS[key],
                    ROLE_GLOW[key]
                  )}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex items-center gap-2 transition-colors',
                  isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span className="hidden sm:inline">{data[key].label}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Sub-nav — sections */}
      <div className="mt-5 flex flex-wrap gap-2">
        <AnimatePresence mode="wait">
          {role.sections.map((s, i) => {
            const isActive = safeSection === i
            return (
              <motion.button
                key={s.title}
                layout
                onClick={() => onSectionChange(i)}
                aria-pressed={isActive}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  isActive
                    ? 'border-white/20 bg-white/[0.08] text-white'
                    : 'border-white/5 bg-white/[0.02] text-slate-500 hover:text-slate-300 hover:border-white/10'
                )}
              >
                {s.title}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ─── Media + Caption ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeRole}-${safeSection}`}
          role="tabpanel"
          aria-label={`${role.label} — ${section.title}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-6"
        >
          {/* ─── Media (full width on desktop) ────────────────────── */}
          <div className="w-full">
            <RoleMedia section={section} accent={ROLE_ACCENTS[activeRole]} />
          </div>

          {/* ─── Caption (below media, full width) ────────────────── */}
          <div className="mt-4">
            <GlassCard hover={false} className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-500">
                    {role.label} · Section {safeSection + 1} of {role.sections.length}
                  </p>
                  <h3 className="text-white font-semibold text-xl mt-1">{section.title}</h3>
                </div>
                <span className="text-xs text-white/30 shrink-0">
                  {section.media.length} media file{section.media.length > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-3 max-w-3xl">
                {section.caption}
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── RoleMedia (optimized with memo) ──────────────────────────────
interface RoleMediaProps {
  section: RestaurantOSCaseStudy['roles']['customer']['sections'][number]
  accent: string
}

const RoleMedia = memo(function RoleMedia({ section, accent }: RoleMediaProps) {
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = section.media.filter((src) => src?.trim())
  const hasMultiple = images.length > 1
  const currentSrc = images[currentIndex]
  const isVideo = currentSrc?.endsWith('.mp4') || currentSrc?.endsWith('.webm')
  const isGif = currentSrc?.endsWith('.gif')
  const currentFailed = failed[currentIndex] || false

  const handleError = (index: number) => {
    setFailed((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="space-y-3 w-full">
      {/* ─── Main media ─────────────────────────────────────────────── */}
      <div
        className={cn(
          'relative w-full rounded-xl bg-gradient-to-br border border-white/5 flex flex-col items-center justify-center gap-2 overflow-hidden',
          'aspect-video', // wider on larger screens
          accent
        )}
      >
        {/* Badge: media type (bottom-right) */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[0.55rem] font-medium uppercase tracking-wider text-white/70">
          {isVideo ? (
            <>
              <Video className="w-3 h-3" />
              Video
            </>
          ) : isGif ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              GIF
            </>
          ) : (
            <>
              <ImageIcon className="w-3 h-3" />
              Screenshot
            </>
          )}
        </div>

        {/* Auto-play indicator for video */}
        {isVideo && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[0.55rem] uppercase tracking-widest font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/20">
            ▶ Auto‑play
          </span>
        )}

        {currentSrc && !currentFailed && isVideo ? (
          <video
            key={currentSrc}
            src={currentSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => handleError(currentIndex)}
          />
        ) : currentSrc && !currentFailed ? (
          <Image
            src={currentSrc}
            alt={`${section.title} — screenshot ${currentIndex + 1}`}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
            onError={() => handleError(currentIndex)}
            priority={currentIndex === 0} // only first image is priority
          />
        ) : (
          <>
            <span className="text-3xl opacity-25">◆</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-500">
              {isVideo ? 'Video' : isGif ? 'GIF' : 'Screenshot'} · placeholder
            </span>
            <span className="text-[0.55rem] uppercase tracking-wider text-slate-600">
              {currentSrc || 'No media provided'}
            </span>
          </>
        )}
      </div>

      {/* ─── Thumbnails strip ───────────────────────────────────────── */}
      {hasMultiple && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin" style={{ scrollbarWidth: 'thin' }}>
            {images.map((src, i) => {
              const isActive = i === currentIndex
              const thumbFailed = failed[i] || false
              const thumbIsVideo = src?.endsWith('.mp4') || src?.endsWith('.webm')

              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    'relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                    isActive
                      ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                      : 'border-white/10 hover:border-white/30'
                  )}
                >
                  {!thumbFailed ? (
                    thumbIsVideo ? (
                      <video
                        src={src}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                        onError={() => handleError(i)}
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        onError={() => handleError(i)}
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-slate-800/50 flex items-center justify-center text-[0.45rem] text-slate-500">
                      ◇
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 ring-2 ring-cyan-400/30 rounded-lg pointer-events-none" />
                  )}
                  {thumbIsVideo && (
                    <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/50 text-[0.45rem] text-white/60">
                      ▶
                    </div>
                  )}
                </button>
              )
            })}
          </div>
          <p className="text-[0.55rem] uppercase tracking-wider text-slate-500 text-center">
            {currentIndex + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  )
})