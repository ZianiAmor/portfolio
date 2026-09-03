'use client'

import { useState, useEffect, useCallback } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('portfolio-theme') as Theme | null
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('portfolio-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }, [theme])

  return { theme, toggleTheme, mounted }
}