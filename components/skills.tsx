'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteConfig } from '@/config/siteConfig'
import { TiltCard } from '@/components/animations/TiltCard'
import {
  Braces,
  ChevronDown,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const smoothEase = [0.23, 1, 0.32, 1] as const

type SkillCategoryName =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools & Platforms'

type SkillDetail = {
  name: string
  level: number
  category: SkillCategoryName
  icon: LucideIcon
  color: string
  version: string
  years: string
  project: string
  projectCount: number
  related: string[]
  certification: string
  breakdown: string[]
}

type CategoryMeta = {
  label: SkillCategoryName
  eyebrow: string
  color: string
  Icon: LucideIcon
}

const categoryMeta: Record<SkillCategoryName, CategoryMeta> = {
  Languages: {
    label: 'Languages',
    eyebrow: 'Core syntax and data work',
    color: '#FF6B6B',
    Icon: Braces,
  },
  Frontend: {
    label: 'Frontend',
    eyebrow: 'Interfaces, motion, and UX',
    color: '#00D4FF',
    Icon: Layers3,
  },
  Backend: {
    label: 'Backend',
    eyebrow: 'APIs, auth, and services',
    color: '#6C63FF',
    Icon: Server,
  },
  Database: {
    label: 'Database',
    eyebrow: 'Models, queries, and scale',
    color: '#22C55E',
    Icon: Database,
  },
  'Tools & Platforms': {
    label: 'Tools & Platforms',
    eyebrow: 'Delivery and developer workflow',
    color: '#F59E0B',
    Icon: GitBranch,
  },
}

const skillMeta: Record<string, Omit<SkillDetail, 'level' | 'category' | 'color'>> = {
  'C++': {
    name: 'C++',
    icon: Code2,
    version: 'C++17 fundamentals',
    years: '2+ years',
    project: 'DSA and systems problem solving',
    projectCount: 8,
    related: ['SQL', 'JavaScript', 'Algorithms'],
    certification: 'Academic coursework and DSA practice',
    breakdown: ['Data structures', 'Problem solving', 'Memory-aware programming'],
  },
  'JavaScript (ES6+)': {
    name: 'JavaScript',
    icon: Braces,
    version: 'ES6+',
    years: '2+ years',
    project: 'AutoMarket campaign dashboard',
    projectCount: 6,
    related: ['React.js', 'Node.js', 'Express.js'],
    certification: 'Production client work',
    breakdown: ['Async flows', 'DOM/runtime behavior', 'API integration'],
  },
  TypeScript: {
    name: 'TypeScript',
    icon: ShieldCheck,
    version: 'TS 5.x',
    years: '1+ year',
    project: 'Next.js portfolio and enterprise modules',
    projectCount: 4,
    related: ['Next.js', 'React.js', 'Prisma ORM'],
    certification: 'Typed production components',
    breakdown: ['Type-safe components', 'API contracts', 'Refactor confidence'],
  },
  'Python (Basics)': {
    name: 'Python',
    icon: Code2,
    version: 'Python 3',
    years: '1+ year',
    project: 'Automation scripts and academic utilities',
    projectCount: 2,
    related: ['SQL', 'Data processing', 'APIs'],
    certification: 'Academic and self-learning',
    breakdown: ['Scripting', 'Data handling', 'Automation basics'],
  },
  SQL: {
    name: 'SQL',
    icon: Database,
    version: 'PostgreSQL SQL',
    years: '2+ years',
    project: 'Vendor Management System reporting',
    projectCount: 5,
    related: ['PostgreSQL', 'Prisma ORM', 'RBAC'],
    certification: 'Production database work',
    breakdown: ['Joins and filters', 'Schema thinking', 'Query optimization'],
  },
  'React.js': {
    name: 'React',
    icon: Layers3,
    version: 'React 19',
    years: '2+ years',
    project: 'AutoMarket Platform',
    projectCount: 7,
    related: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    certification: 'Client dashboard delivery',
    breakdown: ['Stateful UI', 'Reusable components', 'Motion-heavy layouts'],
  },
  'Next.js': {
    name: 'Next.js',
    icon: Globe2,
    version: 'Next.js 16',
    years: '1+ year',
    project: 'Vendor Management System',
    projectCount: 4,
    related: ['React.js', 'TypeScript', 'Vercel'],
    certification: 'Production full-stack app work',
    breakdown: ['App Router', 'SEO metadata', 'Performance-focused pages'],
  },
  HTML5: {
    name: 'HTML',
    icon: Code2,
    version: 'HTML5',
    years: '3+ years',
    project: 'Responsive portfolio and dashboards',
    projectCount: 10,
    related: ['CSS3', 'Accessibility', 'React.js'],
    certification: 'Semantic web fundamentals',
    breakdown: ['Semantic structure', 'Forms', 'Accessibility attributes'],
  },
  CSS3: {
    name: 'CSS',
    icon: Sparkles,
    version: 'CSS3',
    years: '3+ years',
    project: 'Animated glass portfolio',
    projectCount: 10,
    related: ['Tailwind CSS', 'HTML5', 'Responsive UI'],
    certification: 'Responsive interface work',
    breakdown: ['Responsive grids', 'Animation', 'Design systems'],
  },
  'Tailwind CSS': {
    name: 'Tailwind',
    icon: Sparkles,
    version: 'Tailwind CSS 4',
    years: '2+ years',
    project: 'Portfolio design system',
    projectCount: 7,
    related: ['React.js', 'Next.js', 'CSS3'],
    certification: 'Utility-first production styling',
    breakdown: ['Design tokens', 'Responsive states', 'Polished interaction UI'],
  },
  Bootstrap: {
    name: 'Bootstrap',
    icon: Layers3,
    version: 'Bootstrap 5',
    years: '1+ year',
    project: 'Admin interface prototypes',
    projectCount: 3,
    related: ['HTML5', 'CSS3', 'JavaScript'],
    certification: 'Responsive layout practice',
    breakdown: ['Grid system', 'Components', 'Rapid prototyping'],
  },
  'Node.js': {
    name: 'Node.js',
    icon: Server,
    version: 'Node 20+',
    years: '2+ years',
    project: 'AutoMarket campaign processing',
    projectCount: 6,
    related: ['Express.js', 'REST APIs', 'Redis'],
    certification: 'Production backend services',
    breakdown: ['API services', 'Async processing', 'Environment config'],
  },
  'Express.js': {
    name: 'Express',
    icon: Network,
    version: 'Express 5',
    years: '2+ years',
    project: 'Vendor Management APIs',
    projectCount: 6,
    related: ['Node.js', 'JWT', 'REST APIs'],
    certification: 'Production REST API work',
    breakdown: ['Route design', 'Middleware', 'Error handling'],
  },
  'REST APIs': {
    name: 'REST APIs',
    icon: Network,
    version: 'REST/JSON',
    years: '2+ years',
    project: 'VMS approval workflows',
    projectCount: 8,
    related: ['Express.js', 'JWT', 'Postman'],
    certification: 'Enterprise API implementation',
    breakdown: ['Resource modeling', 'Status codes', 'Validation flows'],
  },
  'Authentication/JWT': {
    name: 'JWT',
    icon: ShieldCheck,
    version: 'JWT auth',
    years: '1+ year',
    project: 'Secure vendor portal login',
    projectCount: 4,
    related: ['RBAC', 'Express.js', 'REST APIs'],
    certification: 'Authentication modules in client apps',
    breakdown: ['Token lifecycle', 'Protected routes', 'Session security'],
  },
  RBAC: {
    name: 'RBAC',
    icon: ShieldCheck,
    version: 'Role-based access',
    years: '1+ year',
    project: 'Multi-role VMS dashboard',
    projectCount: 3,
    related: ['JWT', 'PostgreSQL', 'REST APIs'],
    certification: 'Enterprise permission workflows',
    breakdown: ['Permission mapping', 'Role checks', 'Workflow access control'],
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    icon: Database,
    version: 'PostgreSQL 16',
    years: '2+ years',
    project: 'Vendor and invoice data models',
    projectCount: 5,
    related: ['SQL', 'Prisma ORM', 'Node.js'],
    certification: 'Production relational schema work',
    breakdown: ['Relations', 'Indexes', 'Transactional data modeling'],
  },
  MongoDB: {
    name: 'MongoDB',
    icon: Database,
    version: 'MongoDB 7',
    years: '1+ year',
    project: 'MERN practice applications',
    projectCount: 3,
    related: ['Node.js', 'Express.js', 'JavaScript'],
    certification: 'MERN stack project work',
    breakdown: ['Documents', 'Collections', 'Flexible schemas'],
  },
  'Prisma ORM': {
    name: 'Prisma',
    icon: Database,
    version: 'Prisma 6',
    years: '1+ year',
    project: 'VMS database layer',
    projectCount: 4,
    related: ['PostgreSQL', 'TypeScript', 'Next.js'],
    certification: 'Production ORM usage',
    breakdown: ['Schema models', 'Migrations', 'Typed queries'],
  },
  'Git & GitHub': {
    name: 'GitHub',
    icon: GitBranch,
    version: 'Git + GitHub',
    years: '2+ years',
    project: 'Portfolio and client repositories',
    projectCount: 12,
    related: ['Vercel', 'Render', 'Code review'],
    certification: 'Daily developer workflow',
    breakdown: ['Branching', 'Pull requests', 'Version control hygiene'],
  },
  Postman: {
    name: 'Postman',
    icon: Zap,
    version: 'Postman API Platform',
    years: '2+ years',
    project: 'REST API testing suites',
    projectCount: 8,
    related: ['REST APIs', 'JWT', 'Express.js'],
    certification: 'API validation workflow',
    breakdown: ['Collections', 'Auth testing', 'Environment variables'],
  },
  Vercel: {
    name: 'Vercel',
    icon: Globe2,
    version: 'Vercel deployments',
    years: '1+ year',
    project: 'Next.js portfolio deployment',
    projectCount: 4,
    related: ['Next.js', 'GitHub', 'React.js'],
    certification: 'Frontend deployment workflow',
    breakdown: ['Preview deployments', 'Build settings', 'Static optimization'],
  },
  Redis: {
    name: 'Redis',
    icon: Zap,
    version: 'Redis queues/cache',
    years: '1+ year',
    project: 'AutoMarket background jobs',
    projectCount: 2,
    related: ['BullMQ', 'Node.js', 'Campaign processing'],
    certification: 'Queue-backed production modules',
    breakdown: ['Queues', 'Caching basics', 'Job reliability'],
  },
  BullMQ: {
    name: 'BullMQ',
    icon: Network,
    version: 'BullMQ workers',
    years: '1+ year',
    project: 'Scheduled campaign execution',
    projectCount: 2,
    related: ['Redis', 'Node.js', 'PostgreSQL'],
    certification: 'Background worker implementation',
    breakdown: ['Retries', 'Workers', 'Scheduled processing'],
  },
  Render: {
    name: 'Render',
    icon: Globe2,
    version: 'Render cloud hosting',
    years: '1+ year',
    project: 'Backend API deployment',
    projectCount: 3,
    related: ['Node.js', 'PostgreSQL', 'GitHub'],
    certification: 'Backend deployment workflow',
    breakdown: ['Service deploys', 'Environment variables', 'Logs'],
  },
}

function getBadge(level: number) {
  if (level >= 88) return 'Expert'
  if (level >= 75) return 'Advanced'
  return 'Intermediate'
}

function buildSkillDetails(): SkillDetail[] {
  return siteConfig.skills.flatMap((category) => {
    const categoryName = category.name as SkillCategoryName
    const categoryColor = categoryMeta[categoryName].color

    return category.skills.map((skill) => ({
      ...skillMeta[skill.name],
      name: skillMeta[skill.name]?.name ?? skill.name,
      icon: skillMeta[skill.name]?.icon ?? Code2,
      version: skillMeta[skill.name]?.version ?? 'Current stable',
      years: skillMeta[skill.name]?.years ?? '1+ year',
      project: skillMeta[skill.name]?.project ?? 'Portfolio and production modules',
      projectCount: skillMeta[skill.name]?.projectCount ?? 2,
      related: skillMeta[skill.name]?.related ?? [],
      certification: skillMeta[skill.name]?.certification ?? 'Hands-on production practice',
      breakdown: skillMeta[skill.name]?.breakdown ?? ['Implementation', 'Debugging', 'Production usage'],
      level: skill.level,
      category: categoryName,
      color: categoryColor,
    }))
  })
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })
  const [activeCategory, setActiveCategory] = useState<SkillCategoryName>('Frontend')
  const [openCategories, setOpenCategories] = useState<Set<SkillCategoryName>>(
    () => new Set(Object.keys(categoryMeta) as SkillCategoryName[])
  )
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const updateCompact = () => setIsCompact(window.innerWidth < 768)
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateCompact, 120)
    }

    updateCompact()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isCompact) {
      setOpenCategories(new Set(Object.keys(categoryMeta) as SkillCategoryName[]))
    }
  }, [isCompact])

  const skills = useMemo(() => buildSkillDetails(), [])
  const groupedSkills = useMemo(
    () =>
      (Object.keys(categoryMeta) as SkillCategoryName[]).map((category) => ({
        ...categoryMeta[category],
        skills: skills.filter((skill) => skill.category === category),
      })),
    [skills]
  )
  const activeSkills = skills.filter((skill) => skill.category === activeCategory)
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 6)
  const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)

  const toggleCategory = (category: SkillCategoryName) => {
    setOpenCategories((current) => {
      const next = new Set(current)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  return (
    <section
      ref={ref}
      id="skills-panel"
      className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="skills-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ opacity: [0.18, 0.3, 0.18], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-12rem] top-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.12, 0.25, 0.12], scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-[-10rem] bottom-10 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_100%,52px_52px,52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            <Sparkles className="h-4 w-4" />
            Neural Tech Constellation
          </div>
          <h2 id="skills-heading" className="font-heading text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">Technical Arsenal</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A connected map of the full-stack technologies I use to ship secure APIs,
            animated interfaces, database-backed products, and production workflows.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
          className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          aria-label="Skills summary"
        >
          {[
            ['Tech Nodes', skills.length.toString()],
            ['Avg Proficiency', `${averageLevel}%`],
            ['Projects Mapped', `${skills.reduce((sum, skill) => sum + skill.projectCount, 0)}+`],
            ['Core Stacks', 'PERN / MERN'],
          ].map(([label, value]) => (
            <div key={label} className="glass-effect rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-3" aria-label="Skill categories">
            {groupedSkills.map((category, index) => {
              const Icon = category.Icon
              const isActive = activeCategory === category.label
              const isOpen = openCategories.has(category.label)

              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(category.label)
                      if (isCompact) toggleCategory(category.label)
                    }}
                    className={`group flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/60 ${
                      isActive
                        ? 'border-white/20 bg-white/10 shadow-lg shadow-primary/10'
                        : 'glass-effect hover:border-white/20'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`skills-${category.label.replace(/\s+/g, '-')}`}
                    suppressHydrationWarning
                  >
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        color: category.color,
                        borderColor: `${category.color}55`,
                        background: `${category.color}18`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-base font-bold text-foreground">
                        {category.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {category.eyebrow}
                      </span>
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                      {category.skills.length}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform md:hidden ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {(isOpen || !isCompact) && (
                      <motion.div
                        id={`skills-${category.label.replace(/\s+/g, '-')}`}
                        initial={isCompact ? { height: 0, opacity: 0 } : false}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden md:hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 pt-3">
                          {category.skills.map((skill) => (
                            <SkillNodeButton
                              key={skill.name}
                              skill={skill}
                              isHovered={hoveredSkill === skill.name}
                              onHover={setHoveredSkill}
                              onSelect={setSelectedSkill}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </aside>

          <TiltCard tiltAmount={3} glare>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              className="relative hidden min-h-[640px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:block"
              aria-label={`${activeCategory} skill constellation`}
            >
              <ConstellationLines color={categoryMeta[activeCategory].color} />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Active cluster
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-bold text-foreground">
                    {activeCategory}
                  </h3>
                </div>
                <div
                  className="rounded-full border px-4 py-2 text-sm font-semibold"
                  style={{
                    borderColor: `${categoryMeta[activeCategory].color}55`,
                    color: categoryMeta[activeCategory].color,
                    background: `${categoryMeta[activeCategory].color}12`,
                  }}
                >
                  {activeSkills.length} connected nodes
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-6 top-28">
                {activeSkills.map((skill, index) => (
                  <SkillOrb
                    key={skill.name}
                    skill={skill}
                    index={index}
                    total={activeSkills.length}
                    isHovered={hoveredSkill === skill.name}
                    onHover={setHoveredSkill}
                    onSelect={setSelectedSkill}
                  />
                ))}

                <motion.div
                  className="absolute left-1/2 top-1/2 z-0 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/70 text-center shadow-[0_0_60px_rgba(108,99,255,0.18)] backdrop-blur-xl"
                  animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div>
                    <Network className="mx-auto mb-2 h-7 w-7 text-secondary" />
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Stack Core
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </TiltCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.24, ease: smoothEase }}
          className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          <div className="glass-effect rounded-xl p-5 lg:col-span-2">
            <h3 className="mb-4 font-heading text-lg font-bold text-foreground">
              High-impact combinations
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Next.js + TypeScript + Tailwind',
                'Node.js + Express + PostgreSQL',
                'Redis + BullMQ + Campaign Workers',
                'JWT + RBAC + REST APIs',
                'Prisma + PostgreSQL + Dashboards',
              ].map((combo) => (
                <span
                  key={combo}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-secondary/40 hover:text-secondary"
                >
                  {combo}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-xl p-5">
            <h3 className="mb-4 font-heading text-lg font-bold text-foreground">Top nodes</h3>
            <div className="space-y-3">
              {topSkills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setSelectedSkill(skill)}
                  className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-left transition-colors hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  suppressHydrationWarning
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs font-bold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}

function ConstellationLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
      <defs>
        <linearGradient id="skill-line-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="55%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {[
        ['50%', '50%', '18%', '24%'],
        ['50%', '50%', '75%', '24%'],
        ['50%', '50%', '20%', '72%'],
        ['50%', '50%', '78%', '70%'],
        ['18%', '24%', '75%', '24%'],
        ['20%', '72%', '78%', '70%'],
      ].map(([x1, y1, x2, y2], index) => (
        <motion.line
          key={`${x1}-${y1}-${index}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="url(#skill-line-gradient)"
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: index * 0.08 }}
        />
      ))}
    </svg>
  )
}

function SkillOrb({
  skill,
  index,
  total,
  isHovered,
  onHover,
  onSelect,
}: {
  skill: SkillDetail
  index: number
  total: number
  isHovered: boolean
  onHover: (name: string | null) => void
  onSelect: (skill: SkillDetail) => void
}) {
  const Icon = skill.icon
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radiusX = 34
  const radiusY = 30
  const x = 50 + Math.cos(angle) * radiusX
  const y = 50 + Math.sin(angle) * radiusY
  const badge = getBadge(skill.level)

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.12 : 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08 },
        scale: { duration: 0.2 },
        y: { duration: 4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill.name)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(skill)}
      className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border bg-background/80 p-4 text-center shadow-xl backdrop-blur-xl transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/60"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        borderColor: `${skill.color}45`,
        boxShadow: isHovered
          ? `0 0 38px ${skill.color}44, inset 0 0 24px ${skill.color}12`
          : `0 0 18px ${skill.color}18`,
      }}
      aria-label={`${skill.name}, ${skill.level} percent proficiency. Open skill details.`}
      suppressHydrationWarning
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ background: `${skill.color}18`, color: skill.color }}
      >
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="max-w-[8rem] text-sm font-bold text-foreground">{skill.name}</span>
      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
        {badge} · {skill.years}
      </span>
      <SkillTooltip skill={skill} visible={isHovered} />
    </motion.button>
  )
}

function SkillNodeButton({
  skill,
  isHovered,
  onHover,
  onSelect,
}: {
  skill: SkillDetail
  isHovered: boolean
  onHover: (name: string | null) => void
  onSelect: (skill: SkillDetail) => void
}) {
  const Icon = skill.icon

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill.name)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(skill)}
      className="relative rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left backdrop-blur-xl transition-colors hover:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/60"
      aria-label={`${skill.name}, ${skill.level} percent proficiency. Open skill details.`}
      suppressHydrationWarning
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: `${skill.color}18`, color: skill.color }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-foreground">{skill.name}</span>
          <span className="text-xs text-muted-foreground">{getBadge(skill.level)}</span>
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{skill.years}</span>
        <span style={{ color: skill.color }} className="font-bold">
          {skill.level}%
        </span>
      </div>
      <SkillTooltip skill={skill} visible={isHovered} compact />
    </motion.button>
  )
}

function SkillTooltip({
  skill,
  visible,
  compact = false,
}: {
  skill: SkillDetail
  visible: boolean
  compact?: boolean
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className={`pointer-events-none absolute z-50 rounded-xl border border-white/10 bg-[#0A0A0A]/95 p-4 text-left shadow-2xl shadow-black/40 backdrop-blur-xl ${
            compact ? 'left-0 top-full mt-2 w-64' : 'left-1/2 top-full mt-3 w-72 -translate-x-1/2'
          }`}
          role="tooltip"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-bold text-foreground">{skill.name}</span>
            <span className="text-xs font-bold" style={{ color: skill.color }}>
              {skill.level}%
            </span>
          </div>
          <dl className="space-y-2 text-xs text-muted-foreground">
            <div>
              <dt className="font-semibold text-foreground/80">Version</dt>
              <dd>{skill.version}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground/80">Project</dt>
              <dd>{skill.project}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <dt className="font-semibold text-foreground/80">Experience</dt>
                <dd>{skill.years}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground/80">Projects</dt>
                <dd>{skill.projectCount}+</dd>
              </div>
            </div>
            <div>
              <dt className="font-semibold text-foreground/80">Related</dt>
              <dd>{skill.related.join(', ')}</dd>
            </div>
          </dl>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SkillModal({
  skill,
  onClose,
}: {
  skill: SkillDetail | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!skill) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [skill, onClose])

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl shadow-black/50"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: `linear-gradient(90deg, ${skill.color}, #00D4FF)` }}
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/60"
              aria-label="Close skill details"
              suppressHydrationWarning
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-start gap-4 pr-10">
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border"
                style={{
                  color: skill.color,
                  background: `${skill.color}18`,
                  borderColor: `${skill.color}55`,
                }}
              >
                <skill.icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {skill.category}
                </p>
                <h3 id="skill-modal-title" className="font-heading text-3xl font-bold text-foreground">
                  {skill.name}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {getBadge(skill.level)} proficiency with {skill.years} of hands-on use.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Proficiency', `${skill.level}%`],
                ['Projects', `${skill.projectCount}+`],
                ['Version', skill.version],
                ['Use', skill.years],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="mt-1 text-sm font-bold text-foreground">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <h4 className="mb-2 font-heading font-bold text-foreground">Sample Project</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{skill.project}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <h4 className="mb-2 font-heading font-bold text-foreground">Certification / Proof</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{skill.certification}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-3 font-heading font-bold text-foreground">Detailed breakdown</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {skill.breakdown.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-3 font-heading font-bold text-foreground">Related technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skill.related.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      color: skill.color,
                      borderColor: `${skill.color}44`,
                      background: `${skill.color}10`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
