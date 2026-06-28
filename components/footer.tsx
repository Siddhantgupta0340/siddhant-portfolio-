'use client'

import { Mail, Phone, Share2, Code2 } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    {
      icon: Share2,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/siddhant-gupta-b7730930a/',
    },
    {
      icon: Code2,
      label: 'GitHub',
      href: 'https://github.com/',
    },
  ]

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold gradient-text mb-2">
              Siddhant Gupta
            </h3>
            <p className="text-muted-foreground text-sm">
              Full Stack Developer & Software Engineer
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-secondary transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:siddhantgupta0304@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                siddhantgupta0304@gmail.com
              </a>
              <a
                href="tel:9589530325"
                className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 9589530325
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} Siddhant Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
