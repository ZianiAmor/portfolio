'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import ProjectCard from '@/components/ProjectCard'
import FullscreenProjectViewer from '@/components/FullscreenProjectViewer'
import RestaurantOSCaseStudy from '@/components/RestaurantOSCaseStudy'
import ContactForm from '@/components/ContactForm'
import projects from '@/data/projects.json'
import { Project, SkillGroup } from '@/lib/types'

const skillGroups: SkillGroup[] = [
  {
    title: 'Full-Stack Development',
    icon: '</>',
    color: 'bg-cyan-500/10 text-cyan-400',
    description:
      'Building production-grade web applications with modern tools, from database design to pixel-perfect interfaces.',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'REST APIs',
      'WebSockets',
      'Tailwind CSS',
      'Docker',
      'Git',
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const projectsData = projects as Project[]

  const handleOpenProject = (project: Project) => {
    if (project.id === 'restaurantos') {
      setCaseStudyOpen(true)
    } else {
      setSelectedProject(project)
    }
  }

  return (
    <main className="overflow-x-hidden">
      {/* =============== HERO =============== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden px-4"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-br from-cyan-500/3 via-violet-500/4 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-tl from-violet-500/3 to-transparent blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015] grid-pattern" />
        </div>

        <motion.div
          {...fadeInUp}
          className="relative z-10 max-w-4xl mx-auto px-2 sm:px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-xs text-slate-500 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Open to collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight break-words"
          >
            <span className="gradient-text">Ziani Amor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg sm:text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto"
          >
            Full-stack developer · Systems architect
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed px-2"
          >
            Building production-grade web applications with React, Next.js, Node.js, and TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              See my work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">Get in touch</a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-[0.6rem] uppercase tracking-[0.2em]">Scroll</span>
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
            <rect x="1" y="1" width="12" height="22" rx="6" />
            <line x1="7" y1="8" x2="7" y2="13" />
          </svg>
        </div>
      </section>

      {/* =============== ABOUT =============== */}
      <section id="about" className="py-20 sm:py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <span className="section-label">About</span>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10 md:gap-20 items-start">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-3 space-y-5"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15]">
                Full-stack developer &<br />
                <span className="gradient-text">systems architect.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
                I'm a full-stack developer with over 3 years of experience shipping production-grade
                software. I specialize in building web applications with React, Next.js, Node.js,
                and TypeScript — from architecting backends to crafting polished frontends.
              </p>
              <p className="text-slate-500 leading-relaxed text-sm">
                Currently focused on full-stack development, real-time systems, and clean,
                maintainable code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { value: '3+', label: 'Years Building' },
                { value: '3+', label: 'Projects Shipped' },
                { value: '2+', label: 'Production Apps' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-5 sm:p-6 text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-[0.65rem] uppercase tracking-wider text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============== SKILLS =============== */}
      <section id="skills" className="py-20 sm:py-28 md:py-36 border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <span className="section-label">Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-12">
              Tools I <span className="gradient-text">build with.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {skillGroups.map((skill, i) => (
              <GlassCard key={skill.title} delay={i * 0.1} className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${skill.color}`}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{skill.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =============== PROJECTS =============== */}
      <section id="projects" className="py-20 sm:py-28 md:py-36 bg-white/[0.005] border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <span className="section-label">Projects</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-12">
              Selected <span className="gradient-text">work.</span>
            </h2>
          </motion.div>

          {/*
            Flex + justify-center instead of a fixed-column grid.
            This centers correctly whether there's 1 project or 12 —
            a grid centers items *inside* their column tracks, not the
            tracks themselves, so a lone item in a 3-col grid sticks to
            the left. Each card gets a fixed max width so it doesn't
            stretch full-width on its own.
          */}
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
            {projectsData.map((project, i) => (
              <div key={project.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm">
                <ProjectCard
                  project={project}
                  index={i}
                  onOpen={handleOpenProject}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== CONTACT =============== */}
      <section id="contact" className="py-20 sm:py-28 md:py-36 border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <span className="section-label">Contact</span>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 space-y-5"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15]">
                Let's build something <span className="gradient-text">together.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have a project in mind, a collaboration idea, or just want to say hi —
                I'm always open to great conversations.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4l-10 8L2 4" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-3"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <footer className="border-t border-white/[0.02] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center sm:text-left">
          <p>&copy; 2026 Ziani Amor. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with Next.js + Tailwind
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Fullscreen Project Viewer */}
      <FullscreenProjectViewer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* RestaurantOS — purpose-built case study viewer */}
      <RestaurantOSCaseStudy
        open={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />
    </main>
  )
}