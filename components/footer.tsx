import { siteConfig } from '@/config/siteConfig'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, Tailwind CSS & Motion.
        </p>
        <a href="#top" className="font-mono text-xs transition-colors hover:text-primary">
          back to top ↑
        </a>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.03]"
      >
        SIDDHANT
      </p>
    </footer>
  )
}
