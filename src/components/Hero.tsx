'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

function openPopup() {
  window.dispatchEvent(new CustomEvent('open-lead-popup'))
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
          alt="Luxury Interior by Daphne"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 opacity-60 transition-all duration-[3000ms] hover:scale-100 ease-out"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-semibold border border-[#D4AF37]/50 px-6 py-2 rounded-full backdrop-blur-sm bg-black/30">
            Premium Interior Design
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
        >
          Spaces That Feel Like{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA8A2A]">
            Home
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
        >
          Experience the future of interior design with immersive 3D visualization and luxury craftsmanship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA — opens lead popup */}
          <Button
            size="lg"
            onClick={openPopup}
            className="bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37] text-sm uppercase tracking-wider font-bold px-8 py-7 rounded-none shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
          >
            Book Free Consultation
          </Button>

          {/* Secondary CTA — scrolls down to the reels section */}
          <a href="#reels">
            <Button
              size="lg"
              variant="outline"
              className="text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-sm uppercase tracking-wider font-bold px-8 py-7 rounded-none flex items-center gap-2 transition-all backdrop-blur-sm"
            >
              View Recent Projects <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#D4AF37]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#D4AF37] rounded-full" />
        </div>
      </div>
    </section>
  )
}
