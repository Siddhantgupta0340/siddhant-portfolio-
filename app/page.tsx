'use client'

import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Articles from '@/components/articles'
import Testimonials from '@/components/testimonials'
import Education from '@/components/education'
import Contact from '@/components/contact'
import { CustomCursor } from '@/components/custom-cursor'
import { LoadingScreen } from '@/components/loading-screen'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <main className="relative w-full bg-background text-foreground overflow-hidden">
        <Navbar />

        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Experience />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        <section id="articles">
          <Articles />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Education Section */}
        <section id="education">
          <Education />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
