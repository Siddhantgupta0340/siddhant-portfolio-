// Single source of truth for the portfolio. All content mirrors the resume
// (Siddhant_Gupta_Junior_Software_Engineer_Resume.pdf). Keep it truthful.

export const siteConfig = {
  name: 'Siddhant Gupta',
  firstName: 'Siddhant',
  lastName: 'Gupta',
  initials: 'SG',
  role: 'Junior Software Engineer',
  roles: ['Full Stack Engineer', 'React + TypeScript Developer', 'FastAPI & Node.js Builder', 'API & Database Engineer'],
  headline: 'I build production, ERP-integrated web apps that turn messy data into live dashboards.',
  summary:
    'Junior Software Engineer building production, ERP-integrated web applications with React, TypeScript, Node.js, Python (FastAPI) and PostgreSQL. Skilled in REST API design, JWT authentication and role-based access control (RBAC), SAP data integration, Redis caching and SQL query optimization. I deliver clean, scalable, well-tested features in Agile teams.',
  location: 'Indore, Madhya Pradesh, India',
  email: 'siddhantgupta0304@gmail.com',
  phone: '+91-9589530325',
  available: 'Open to Software Engineer roles · Anywhere in India',

  social: {
    github: 'https://github.com/Siddhantgupta0340',
    linkedin: 'https://www.linkedin.com/in/siddhant-gupta-b7730930a',
    leetcode: 'https://leetcode.com/u/Siddhant_Gupta0304',
  },

  navItems: [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ],

  stats: [
    { value: 60, suffix: '%', label: 'Faster APIs with Redis + BullMQ' },
    { value: 500, suffix: '+', label: 'Users served on PERN apps' },
    { value: 45, suffix: '%', label: 'Prisma query time cut' },
    { value: 2, suffix: ' hrs', label: 'Manual reporting removed daily' },
  ],

  experience: [
    {
      role: 'Junior Software Engineer',
      company: 'Bhaskar Savitt Industries Pvt. Ltd.',
      location: 'Indore, MP',
      duration: 'Jul 2026 – Present',
      type: 'Full-time',
      current: true,
      highlights: [
        "Develop Wishvam, the company's unified operations platform that replaces manual SAP-to-Excel reporting with live dashboards for sales, stock, dispatch and production teams.",
        'Build FastAPI REST APIs and optimized PostgreSQL queries over a medallion data model fed by SAP OData ingestion.',
        'Create responsive React + TypeScript screens with data grids, server-side search and filters, KPI charts and Excel export.',
        'Implement role-based access control with team-level data scoping and Redis caching for secure, fast reporting.',
        'Ship features via Git pull requests, database migrations, automated tests and Docker deployments on AWS.',
      ],
      tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    },
    {
      role: 'SDE Intern',
      company: 'ITSOFT LAB',
      location: 'Indore, MP',
      duration: 'Jan 2026 – Jun 2026',
      type: 'Internship',
      current: false,
      highlights: [
        'Developed features for a Vendor Management System and Restaurant POS platform on the PERN stack, serving 500+ users.',
        'Built secure REST APIs with Node.js, Express.js, PostgreSQL and Prisma ORM, using JWT authentication and multi-role RBAC.',
        'Optimized SQL queries and added Redis caching and BullMQ background jobs, improving API performance by 60%.',
        'Delivered responsive React.js and Tailwind CSS interfaces in 2-week Agile sprints; recognized as Outstanding Performer.',
      ],
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ'],
    },
  ],

  projects: [
    {
      title: 'Wishvam',
      subtitle: 'Unified Operations Platform',
      badge: 'Enterprise · Live',
      description:
        'SAP-integrated platform giving a textile manufacturer real-time visibility into sales, stock, dispatch, purchase orders, costing and production.',
      points: [
        'Removed about 2 hours of daily manual Excel reporting',
        'Team-wise sales reports, stock ageing analysis, global search sheets with export',
        'Task manager with email notifications',
      ],
      metric: { value: '~2 hrs', label: 'saved every day' },
      tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'Dagster', 'SAP OData', 'Docker', 'AWS ECS', 'GitHub Actions'],
      link: null as string | null,
      featured: true,
    },
    {
      title: 'Restaurant POS',
      subtitle: 'Multi-restaurant SaaS',
      badge: 'Live',
      description:
        'Multi-restaurant SaaS POS covering onboarding, tables, orders, kitchen operations, billing, subscriptions and licenses.',
      points: [
        'Organization-level RBAC for five staff roles',
        'Real-time waiter-to-kitchen order flow',
      ],
      metric: { value: '5', label: 'staff roles with RBAC' },
      tech: ['Next.js', 'TypeScript', 'Hono.js', 'Drizzle ORM', 'PostgreSQL'],
      link: 'https://positsoftlab.vercel.app' as string | null,
      featured: false,
    },
    {
      title: 'Vendor Management System',
      subtitle: 'Procurement automation',
      badge: 'Enterprise · Live',
      description:
        'Procurement automation platform with vendor onboarding, purchase orders, invoices and 3-way matching workflows.',
      points: [
        'RBAC for 5+ roles',
        'Optimized Prisma queries, cutting execution time by 45%',
      ],
      metric: { value: '45%', label: 'faster queries' },
      tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redis'],
      link: null as string | null,
      featured: false,
    },
  ],

  skills: [
    { name: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'] },
    { name: 'Frontend', items: ['React.js', 'Next.js', 'Vite', 'Tailwind CSS', 'Recharts', 'HTML5', 'CSS3', 'Bootstrap'] },
    { name: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'Hono.js', 'REST APIs', 'JWT', 'RBAC', 'BullMQ'] },
    { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLAlchemy', 'Prisma ORM', 'Drizzle ORM', 'Mongoose', 'Alembic'] },
    { name: 'Cloud & DevOps', items: ['AWS (ECS Fargate, RDS, S3)', 'Docker', 'GitHub Actions', 'Git', 'GitHub', 'Vercel', 'Render', 'Postman'] },
    { name: 'Concepts', items: ['Data Structures & Algorithms', 'API Design', 'SAP OData Integration', 'Agile / Scrum'] },
  ],

  marquee: ['React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Prisma', 'Drizzle', 'Hono', 'Tailwind', 'GitHub Actions', 'BullMQ', 'SQLAlchemy', 'MongoDB'],

  education: [
    {
      degree: 'B.Tech, Computer Science & Engineering',
      institution: 'IPS Academy, Indore',
      period: '2022 – 2026',
      score: 'CGPA 7.0 / 10',
    },
    { degree: 'Class XII (MPBSE)', institution: 'MP Board', period: '2022', score: '79%' },
    { degree: 'Class X (MPBSE)', institution: 'MP Board', period: '2020', score: '82%' },
  ],

  achievements: [
    { title: 'Outstanding Performer', detail: 'ITSOFT LAB, for project contributions and delivery quality.' },
    { title: 'Client Excellence Award', detail: 'For delivery of the Vendor Management System platform.' },
  ],
}

export type SiteConfig = typeof siteConfig
