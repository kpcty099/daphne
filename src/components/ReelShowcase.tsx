'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import { useEngagement } from '@/hooks/useEngagement'

const FEATURED_REELS = [
  { id: 'DYHpp63v3mH', caption: 'Stunning Modern Interior Transformation' },
  { id: 'DTnj7Mygaap', caption: 'Elegant Bedroom Makeover' },
  { id: 'DLIIXMxhpIQ', caption: 'Luxury Apartment Living Room' },
]

function ReelCard({ reel, index, onViewed }: {
  reel: typeof FEATURED_REELS[0]
  index: number
  onViewed: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const hasTracked = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true
          onViewed()
        }
      },
      { threshold: 0.6 } // 60% of the card must be visible
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onViewed])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-black border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.05)] group hover:border-[#D4AF37]/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col"
    >
      {/* Instagram Embed — fills naturally and repeats on replay */}
      <div className="w-full h-[580px] bg-[#0A0A0A] relative flex justify-center items-center overflow-hidden">
        {/* Subtle background label — only visible if iframe hasn't loaded */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-0 pointer-events-none">
          <Play className="w-8 h-8 text-[#D4AF37]/20" />
          <p className="text-[11px] text-gray-700 uppercase tracking-widest">Loading reel…</p>
        </div>

        {/*
          Using /embed/ (trailing slash) avoids the CORS redirect.
          The embed itself has a built-in replay button — no external controls needed.
        */}
        <iframe
          src={`https://www.instagram.com/p/${reel.id}/embed/`}
          className="w-[326px] h-full max-w-full border-0 relative z-10"
          allow="encrypted-media; autoplay"
          scrolling="no"
          loading="lazy"
          title={reel.caption}
        />
      </div>

      {/* Card footer */}
      <div className="p-5 text-center border-t border-[#D4AF37]/20 bg-gradient-to-b from-black to-[#0A0A0A] flex flex-col gap-3">
        <h3 className="text-sm text-[#F3E5AB] line-clamp-1 font-medium">{reel.caption}</h3>

        <div className="flex gap-2">
          {/* Primary CTA — opens lead popup */}
          <Button
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-popup'))}
            className="flex-1 bg-[#D4AF37] text-black hover:bg-[#F3E5AB] rounded-none uppercase tracking-wider text-xs font-bold transition-colors"
          >
            Get Free Estimate
          </Button>

          {/* Secondary — opens reel on Instagram */}
          <a
            href={`https://www.instagram.com/reel/${reel.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch on Instagram"
          >
            <Button
              variant="outline"
              size="icon"
              className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-none w-10 h-10 flex-shrink-0"
            >
              <Play className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function ReelShowcase() {
  const { trackReelView } = useEngagement()

  return (
    <section className="py-24 bg-black relative border-y border-[#D4AF37]/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-black to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]"
          >
            Experience Our Work
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Swipe through our latest transformations and design visualizations from Instagram.
          </p>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {FEATURED_REELS.map((reel, index) => (
              <CarouselItem key={reel.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                <ReelCard reel={reel} index={index} onViewed={trackReelView} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="border-[#D4AF37] bg-black hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] left-[-40px]" />
            <CarouselNext className="border-[#D4AF37] bg-black hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] right-[-40px]" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
