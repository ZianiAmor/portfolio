'use client'

import { useState, useRef, useCallback } from 'react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }, [])

  const handleMouseDown = () => {
    dragging.current = true
  }

  const handleMouseUp = () => {
    dragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full) */}
      <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-1 opacity-30">◆</div>
          <p className="text-slate-600 text-xs uppercase tracking-widest">{afterLabel}</p>
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-1 opacity-30">◆</div>
            <p className="text-slate-600 text-xs uppercase tracking-widest">{beforeLabel}</p>
          </div>
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/70 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white bg-dark-900/80 backdrop-blur-sm flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="9" y1="4" x2="9" y2="20" />
            <line x1="15" y1="4" x2="15" y2="20" />
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="20" y2="15" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-dark-900/60 backdrop-blur-sm text-[0.6rem] uppercase tracking-wider text-slate-400">
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-dark-900/60 backdrop-blur-sm text-[0.6rem] uppercase tracking-wider text-slate-400">
        {afterLabel}
      </div>
    </div>
  )
}