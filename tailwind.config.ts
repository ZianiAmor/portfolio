import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        dark: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#0a0a0b',
          950: '#050508',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.04)',
          light: 'rgba(255, 255, 255, 0.02)',
          medium: 'rgba(255, 255, 255, 0.06)',
        },
        cyan: {
          ne: '#67e8f9',
        },
        violet: {
          ne: '#a78bfa',
          deep: '#7c3aed',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(30, 27, 46, 0.6), rgba(20, 18, 32, 0.8))',
        'gradient-cyan-violet': 'linear-gradient(135deg, #67e8f9 0%, #a78bfa 50%, #c084fc 100%)',
      },
      boxShadow: {
        'glow': '0 20px 60px rgba(103, 232, 249, 0.06), 0 0 80px rgba(167, 139, 250, 0.04)',
        'glow-strong': '0 12px 40px rgba(103, 232, 249, 0.15)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in': 'fade-in 0.7s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',

      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(10, 10, 11, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        },
        '.glass-card': {
          background: 'linear-gradient(145deg, rgba(30, 27, 46, 0.6), rgba(20, 18, 32, 0.8))',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '16px',
          transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '.glass-card:hover': {
          transform: 'translateY(-6px)',
          borderColor: 'rgba(103, 232, 249, 0.15)',
          boxShadow: '0 20px 60px rgba(103, 232, 249, 0.06), 0 0 80px rgba(167, 139, 250, 0.04)',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #67e8f9 0%, #a78bfa 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.tag': {
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: '500',
          letterSpacing: '0.02em',
          background: 'rgba(103, 232, 249, 0.06)',
          color: '#67e8f9',
          border: '1px solid rgba(103, 232, 249, 0.08)',
        },
        '.input-glass': {
          width: '100%',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          color: '#e2e8f0',
          fontSize: '0.9rem',
          outline: 'none',
        },
        '.input-glass:focus': {
          borderColor: 'rgba(103, 232, 249, 0.25)',
          background: 'rgba(255, 255, 255, 0.035)',
        },
        '.btn-primary': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.7rem 1.6rem',
          borderRadius: '999px',
          fontWeight: '600',
          fontSize: '0.9rem',
          color: '#fff',
          background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
          border: 'none',
          cursor: 'pointer',
        },
        '.btn-ghost': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.7rem 1.6rem',
          borderRadius: '999px',
          fontWeight: '500',
          fontSize: '0.9rem',
          color: '#94a3b8',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'transparent',
          cursor: 'pointer',
        },
        '.section-label': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#64748b',
          marginBottom: '1rem',
        },
        '.section-label::before': {
          content: "''",
          width: '24px',
          height: '1px',
          background: '#334155',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
export default config