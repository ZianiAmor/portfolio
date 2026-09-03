'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { restaurantOSCase, RoleKey } from '@/data/restaurantos-case'
import HookStage from './HookStage'
import PlanningStage from './PlanningStage'
import RolesStage from './RolesStage'
import RetrospectiveStage from './RetrospectiveStage'

const stageNames = [
  'Hook',
  restaurantOSCase.planning.title,
  restaurantOSCase.roles.title,
  restaurantOSCase.retrospective.title,
]

interface RestaurantOSCaseStudyProps {
  open: boolean
  onClose: () => void
}

export default function RestaurantOSCaseStudy({ open, onClose }: RestaurantOSCaseStudyProps) {
  const [stage, setStage] = useState(0)
  const [activeRole, setActiveRole] = useState<RoleKey>(restaurantOSCase.roles.defaultRole)
  const [activeSection, setActiveSection] = useState(0)
  const [hasNavigated, setHasNavigated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocusedRef = useRef<Element | null>(null)

  useEffect(() => {
    if (open) {
      setStage(0)
      setActiveRole(restaurantOSCase.roles.defaultRole)
      setActiveSection(0)
      setHasNavigated(false)
      lastFocusedRef.current = document.activeElement
      requestAnimationFrame(() => {
        panelRef.current
          ?.querySelector<HTMLButtonElement>('[aria-label="Close case study"]')
          ?.focus()
      })
    } else if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [stage])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const handleRoleChange = (key: RoleKey) => {
    setActiveRole(key)
    setActiveSection(0)
  }

  const goNext = () => {
    setHasNavigated(true)
    setStage((s) => Math.min(3, s + 1))
  }

  const goPrev = () => {
    setStage((s) => Math.max(0, s - 1))
  }

  const handlePanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const list = Array.from(focusables).filter((el) => el.offsetParent !== null)
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const isLastStage = stage === 3
  const isFirstStage = stage === 0
  const showNextHint = !isLastStage && !hasNavigated

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="RestaurantOS case study"
            tabIndex={-1}
            onKeyDown={handlePanelKeyDown}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden focus:outline-none rounded-2xl border border-white/5 bg-dark-900/95 backdrop-blur-2xl shadow-2xl flex flex-col"
          >
            {/* Persistent Live Demo pill */}
            <a
              href={restaurantOSCase.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo — opens in a new tab"
              className="absolute top-3 right-[4.25rem] z-20 inline-flex items-center gap-1.5 px-3 h-11 sm:h-10 rounded-full border border-white/10 bg-dark-900/80 backdrop-blur-sm text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-400/30 transition-all"
            >
              Live Demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-3 right-3 z-20 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div ref={scrollRef} className="overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {stage === 0 && (
                    <HookStage
                      data={restaurantOSCase.hook}
                      liveDemoUrl={restaurantOSCase.liveDemoUrl}
                    />
                  )}
                  {stage === 1 && <PlanningStage data={restaurantOSCase.planning} />}
                  {stage === 2 && (
                    <RolesStage
                      data={restaurantOSCase.roles}
                      activeRole={activeRole}
                      activeSection={activeSection}
                      onRoleChange={handleRoleChange}
                      onSectionChange={setActiveSection}
                    />
                  )}
                  {stage === 3 && <RetrospectiveStage data={restaurantOSCase.retrospective} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ─── Navigation ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-t border-white/5 flex-shrink-0 bg-dark-900/30">
              {/* Left Arrow */}
              <button
                onClick={goPrev}
                disabled={isFirstStage}
                aria-label="Previous stage"
                className="group relative w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              {/* Stage progress: dots + label */}
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  {stageNames.map((name, i) => {
                    const isActive = stage === i
                    const isPast = i < stage
                    return (
                      <button
                        key={name}
                        onClick={() => setStage(i)}
                        aria-label={`Go to ${name}`}
                        aria-current={isActive ? 'step' : undefined}
                        className="group relative flex items-center justify-center w-7 h-7 focus:outline-none"
                      >
                        <span
                          className={`
                            block rounded-full transition-all duration-300 ease-out
                            ${isActive 
                              ? 'w-5 h-2 bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.35)]' 
                              : isPast 
                                ? 'w-2 h-2 bg-white/40' 
                                : 'w-2 h-2 bg-white/15 group-hover:bg-white/30'
                            }
                          `}
                        />
                      </button>
                    )
                  })}
                </div>
                <span className="text-[0.55rem] uppercase tracking-widest text-slate-400 font-medium">
                  {stageNames[stage]}
                </span>
              </div>

              {/* Right Arrow – rotating cyan ring hint until user navigates once */}
              <button
                onClick={goNext}
                disabled={isLastStage}
                aria-label="Next stage"
                className="group relative w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {showNextHint && (
                  <span
                    className="absolute -inset-[3px] rounded-full opacity-70 animate-spin-slow pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(34,211,238,0.9), rgba(34,211,238,0) 70%)',
                      WebkitMask:
                        'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                    }}
                  />
                )}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Scrollbar & animation styles ──────────────────────────────────────
   Add this once, globally (e.g. in globals.css), rather than per-component.
   If you'd rather keep it scoped to this file, wrap it in a <style jsx> tag
   right after the closing </div> of the scroll container above.
------------------------------------------------------------------------
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(34, 211, 238, 0.35) transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.5), rgba(34, 211, 238, 0.2));
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.6);
}

Add to tailwind.config.js under theme.extend.animation:
  'spin-slow': 'spin 3s linear infinite',
------------------------------------------------------------------------- */