'use client'

import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ReelShowcase } from "@/components/ReelShowcase"
import { BeforeAfter } from "@/components/BeforeAfter"
import { Services } from "@/components/Services"
import { LeadPopup } from "@/components/LeadPopup"
import { useEngagement } from "@/hooks/useEngagement"

export default function Home() {
  // Starts scroll-depth + time-on-page tracking for smart popup triggering
  useEngagement()

  return (
    <main className="min-h-screen bg-black scroll-smooth">
      <Header />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="reels">
        <ReelShowcase />
      </div>
      <div id="transformations">
        <BeforeAfter />
      </div>
      <LeadPopup />

      {/* Footer */}
      <footer className="py-12 border-t border-[#D4AF37]/20 bg-[#050505] text-center text-gray-500 text-sm">
        <p>Â© 2026 interiorsby.daphne. All rights reserved.</p>
        <p className="mt-2 text-gray-600 font-light max-w-lg mx-auto">
          This site uses cookies for analytics and tracking to improve your experience. 
          By continuing to use this site, you agree to our privacy policy.
        </p>
      </footer>
    </main>
  )
}
