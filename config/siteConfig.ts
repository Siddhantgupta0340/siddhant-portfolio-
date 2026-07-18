export const siteConfig = {
  name: 'Siddhant Gupta',
  initials: 'SG',
  role: 'Full Stack Developer & Software Engineer',
  tagline: 'Building production-grade applications with PERN & MERN stacks',
  description:
    'Software Development Engineer with hands-on experience designing, developing, and deploying production-ready full-stack web applications using the PERN and MERN stacks. Experienced in secure REST APIs, authentication systems, Role-Based Access Control, background job processing, and scalable database-driven applications.',
  location: 'Indore, Madhya Pradesh',
  email: 'siddhantgupta0304@gmail.com',
  phone: '+91-9589530325',

  social: {
    github: 'https://github.com/Siddhantgupta0340',
    linkedin: 'https://linkedin.com/in/siddhant-gupta',
  },

  stats: [
    { value: 2, suffix: '+', label: 'Enterprise Projects' },
    { value: 10, suffix: 'K+', label: 'Campaigns Processed' },
    { value: 50, suffix: '+', label: 'Vendors Managed' },
    { value: 1, suffix: '+', label: 'Year Experience' },
  ],

  navItems: [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ],

  typingSequences: [
    'Full Stack Developer',
    1500,
    'Software Engineer',
    1500,
    'PERN Stack Developer',
    1500,
    'API Architect',
    1500,
    'React Developer',
    1500,
  ] as (string | number)[],

  skills: [
    {
      name: 'Languages',
      icon: 'Code',
      skills: [
        { name: 'C++', level: 75 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'TypeScript', level: 80 },
        { name: 'Python (Basics)', level: 50 },
        { name: 'SQL', level: 85 },
      ],
    },
    {
      name: 'Frontend',
      icon: 'UI',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Bootstrap', level: 75 },
      ],
    },
    {
      name: 'Backend',
      icon: 'API',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 88 },
        { name: 'REST APIs', level: 92 },
        { name: 'Authentication/JWT', level: 85 },
        { name: 'RBAC', level: 80 },
      ],
    },
    {
      name: 'Database',
      icon: 'DB',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 75 },
        { name: 'Prisma ORM', level: 85 },
      ],
    },
    {
      name: 'Tools & Platforms',
      icon: 'Ops',
      skills: [
        { name: 'Git & GitHub', level: 88 },
        { name: 'Postman', level: 85 },
        { name: 'Vercel', level: 80 },
        { name: 'Redis', level: 70 },
        { name: 'BullMQ', level: 72 },
        { name: 'Render', level: 75 },
      ],
    },
  ],

  projects: [
    {
      title: 'Vendor Management System (VMS)',
      description:
        'Enterprise-level procurement system automating vendor onboarding, purchase orders, invoices, and payment workflows.',
      features: [
        'Secure JWT authentication with RBAC',
        'Multi-level approval workflows',
        'Three-way invoice matching',
        'Responsive dashboards with real-time data',
      ],
      tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'JWT'],
      type: 'Live Client Project' as const,
      status: 'live' as const,
      impact: 'Implemented for enterprise clients with 50+ vendors',
      color: '#6C63FF',
    },
    {
      title: 'AutoMarket Platform',
      description:
        'Marketing automation platform managing Email, WhatsApp, and SMS campaigns from a unified dashboard.',
      features: [
        'Bulk customer import and segmentation',
        'Automated campaign scheduling',
        'Redis and BullMQ background processing',
        'High-performance campaign execution',
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'BullMQ'],
      type: 'Live Client Project' as const,
      status: 'live' as const,
      impact: 'Processed 10K+ marketing campaigns monthly',
      color: '#00D4FF',
    },
  ],

  articles: [
    {
      title: 'Designing RBAC for Enterprise Dashboards',
      category: 'Backend',
      readTime: '6 min read',
      summary:
        'A practical breakdown of roles, permissions, middleware, and database checks for secure application workflows.',
    },
    {
      title: 'Queue-Based Campaign Processing with BullMQ',
      category: 'Systems',
      readTime: '5 min read',
      summary:
        'How background workers, Redis queues, and retry logic keep marketing automations responsive at scale.',
    },
    {
      title: 'Building Prisma Models for Procurement Systems',
      category: 'Database',
      readTime: '7 min read',
      summary:
        'Patterns for invoices, vendors, purchase orders, and approvals in relational database-backed apps.',
    },
  ],

  testimonials: [
    {
      quote:
        'Siddhant turns complex workflows into clean, usable dashboards and dependable backend systems.',
      name: 'Project Mentor',
      title: 'Senior Developer, ITSOFT LAB',
    },
    {
      quote:
        'He learns quickly, communicates clearly, and brings ownership to production-facing features.',
      name: 'Engineering Lead',
      title: 'Full-stack Team',
    },
  ],

  experience: [
    {
      role: 'Software Development Engineer (Full Stack)',
      company: 'ITSOFT LAB',
      location: 'Indore, Madhya Pradesh',
      duration: 'May 2026 - Present',
      type: 'Full-time',
      highlights: [
        'Promoted from Software Developer Intern to SDE after a successful 3-month internship based on performance and project impact.',
        'Build and maintain production-ready enterprise applications using the PERN stack.',
        'Collaborate with senior developers and cross-functional teams in Agile development environments.',
        'Develop secure REST APIs and implement JWT authentication with RBAC.',
        'Design responsive dashboards and optimize database operations using Prisma ORM and PostgreSQL.',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      institution: 'IPS Academy, Indore',
      period: '2022 - 2026',
      score: 'CGPA: 7.0 / 10',
      type: 'cgpa' as const,
    },
    {
      degree: 'Higher Secondary (Class XII)',
      field: 'MPBSE Board',
      institution: 'Govt.High School',
      period: '2022',
      score: '79%',
      type: 'percentage' as const,
    },
    {
      degree: 'Secondary (Class X)',
      field: 'MPBSE Board',
      institution: 'Govt.H.S School',
      period: '2020',
      score: '82%',
      type: 'percentage' as const,
    },
  ],
}

export type SiteConfig = typeof siteConfig
