'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RestaurantOSCaseStudy } from '@/data/restaurantos-case'

const CTA_EASE = [0.22, 1, 0.36, 1]

interface HookStageProps {
  data: RestaurantOSCaseStudy['hook']
  liveDemoUrl?: string
  heroImage?: string
}

export default function HookStage({ data, liveDemoUrl = '', heroImage = '/images/restaurantos-hero.png' }: HookStageProps) {
  const [imgFailed, setImgFailed] = useState(false)

  const ctaUrl = data.ctaUrl || liveDemoUrl

  return (
    <div className="flex flex-col h-full">
      {/* ————— TOP: Text ————— */}
      <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: CTA_EASE }}
        >
          <span className="section-label">RestaurantOS · Case Study</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: CTA_EASE }}
          className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-[1.12] max-w-2xl"
        >
          {data.positioning}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: CTA_EASE }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
        >
          {data.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: CTA_EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
        >
          {data.stats.map((stat) => (
            <div key={stat.label} className="glass-card p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-xl font-bold gradient-text">{stat.value}</div>
              <div className="text-[0.55rem] uppercase tracking-wider text-slate-500 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: CTA_EASE }}
        >
        </motion.div>
      </div>

      {/* ————— BOTTOM: Hero Image ————— */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: CTA_EASE }}
        className="relative h-[220px] sm:h-[280px] md:h-[320px] flex-shrink-0 overflow-hidden bg-[#150f0b] rounded-b-2xl"
      >
        {!imgFailed ? (
          <>
            <Image
              src={heroImage}
              alt="RestaurantOS – product screenshot"
              fill
              className="object-cover object-top"
              onError={() => setImgFailed(true)}
              priority
            />
            {/* Gradient overlay for brand text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#150f0b] via-[#150f0b]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3
                className="text-xl sm:text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#f3ece1' }}
              >
                Ember
              </h3>
              <p
                className="mt-0.5 italic text-sm"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#d4884a' }}
              >
                “Fire-crafted food, shared with warmth.”
              </p>
            </div>
          </>
        ) : (
          /* Fallback – brand placeholder when image is missing */
          <div className="relative w-full h-full p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#150f0b] to-[#1a1210]">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#d4884a]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-[#fbbf24]/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#d4884a] to-[#fbbf24] flex items-center justify-center shadow-[0_8px_30px_rgba(212,136,74,0.35)]">
                <span aria-hidden className="text-2xl">🔥</span>
              </div>
              <h3
                className="mt-4 text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#f3ece1' }}
              >
                Ember
              </h3>
              <p
                className="mt-1 italic text-sm"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#d4884a' }}
              >
                “Fire-crafted food, shared with warmth.”
              </p>
              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.15em] text-[#f3ece1]/30">
                restaurantos-hero.png · screenshot coming soon
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}