import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Siddhant Gupta - Full Stack Developer & SDE',
  description:
    'Portfolio of Siddhant Gupta - Software Development Engineer specializing in PERN/MERN stacks, REST APIs, authentication systems, and enterprise-grade applications.',
  keywords: [
    'Siddhant Gupta',
    'Full Stack Developer',
    'Software Engineer',
    'PERN Stack',
    'MERN Stack',
    'React Developer',
    'Node.js Developer',
    'Next.js',
    'Portfolio',
  ],
  authors: [{ name: 'Siddhant Gupta' }],
  creator: 'Siddhant Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Siddhant Gupta - Full Stack Developer & SDE',
    description:
      'Software Development Engineer specializing in PERN/MERN stacks, REST APIs, and enterprise applications.',
    siteName: 'Siddhant Gupta Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddhant Gupta - Full Stack Developer',
    description:
      'Software Development Engineer specializing in PERN/MERN stacks and enterprise applications.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Siddhant Gupta',
              jobTitle: 'Software Development Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'ITSOFT LAB',
              },
              sameAs: [
                'https://github.com/Siddhantgupta0340',
                'https://linkedin.com/in/siddhant-gupta',
              ],
              knowsAbout: [
                'Full Stack Development',
                'React.js',
                'Next.js',
                'Node.js',
                'PostgreSQL',
                'REST APIs',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
