import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { RESUME_FILE_NAME, RESUME_URL } from '@/lib/resume'
import { siteConfig } from '@/config/siteConfig'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const title = 'Siddhant Gupta · Junior Software Engineer'
const description =
  'Junior Software Engineer in Indore building production, ERP-integrated web apps with React, TypeScript, Node.js, FastAPI and PostgreSQL.'

export const metadata: Metadata = {
  metadataBase: new URL('https://siddhantgupta-portfolio.vercel.app'),
  alternates: { canonical: '/' },
  title,
  description,
  keywords: [
    'Siddhant Gupta',
    'Junior Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Node.js',
    'FastAPI',
    'PostgreSQL',
    'Indore',
  ],
  authors: [{ name: 'Siddhant Gupta' }],
  creator: 'Siddhant Gupta',
  openGraph: { type: 'website', locale: 'en_IN', title, description, siteName: 'Siddhant Gupta' },
  twitter: { card: 'summary_large_image', title, description },
  // Favicon, app icons and the social preview image come from app/favicon.ico,
  // app/icon.png, app/apple-icon.png and app/opengraph-image.png (scripts/make-icons.py).
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0e13',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteConfig.name,
              jobTitle: siteConfig.role,
              worksFor: { '@type': 'Organization', name: 'Bhaskar Savitt Industries Pvt. Ltd.' },
              address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressCountry: 'IN' },
              sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.leetcode],
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
              subjectOf: {
                '@type': 'DigitalDocument',
                name: RESUME_FILE_NAME,
                encodingFormat: 'application/pdf',
                url: RESUME_URL,
              },
            }),
          }}
        />
      </head>
      <body className="noise">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
