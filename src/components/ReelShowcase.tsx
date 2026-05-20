'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useEngagement } from '@/hooks/useEngagement'

const FEATURED_REELS = [
  { id: 'DYHpp63v3mH', caption: 'Stunning Modern Interior Transformation' },
  { id: 'DTnj7Mygaap', caption: 'Elegant Bedroom Makeover' },
  { id: 'DLIIXMxhpIQ', caption: 'Luxury Apartment Living Room' },
]

function ReelCard({
  reel,
  index,
  onViewed,
}: {
  reel: (typeof FEATURED_REELS)[number]
  index: number
  onViewed: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(index === 0)
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
      { threshold: 0.6 }
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-black shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
    >
      <div className="relative flex h-[580px] w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
        {isLoaded ? (
          <iframe
            src={`https://www.instagram.com/p/${reel.id}/embed/`}
            className="relative z-10 h-full w-[326px] max-w-full border-0"
            allow="encrypted-media; autoplay"
            scrolling="no"
            loading="lazy"
            title={reel.caption}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),rgba(10,10,10,0.95)_55%)] text-center"
            aria-label={`Load ${reel.caption}`}
          >
            <span className="grid size-16 place-items-center rounded-full border border-[#D4AF37]/40 bg-black/70 text-[#D4AF37] shadow-[0_0_28px_rgba(212,175,55,0.18)] transition-transform group-hover:scale-110">
              <Play className="size-7 fill-current" />
            </span>
            <span className="max-w-[240px] text-sm font-semibold uppercase tracking-[0.22em] text-[#F3E5AB]">
              Tap to load reel
            </span>
            <span className="max-w-[260px] text-xs leading-6 text-gray-500">
              Instagram videos are loaded only when opened, so the page stays fast.
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#D4AF37]/20 bg-gradient-to-b from-black to-[#0A0A0A] p-5 text-center">
        <h3 className="line-clamp-1 text-sm font-medium text-[#F3E5AB]">{reel.caption}</h3>

        <div className="flex gap-2">
          <Button
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-popup'))}
            className="flex-1 rounded-none bg-[#D4AF37] text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#F3E5AB]"
          >
            Get Free Estimate
          </Button>

          <a
            href={`https://www.instagram.com/reel/${reel.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch on Instagram"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0 rounded-none border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <ExternalLink className="size-4" />
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
    <section className="relative border-y border-[#D4AF37]/20 bg-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-bold text-[#D4AF37] md:text-5xl"
          >
            Experience Our Work
          </motion.h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-[#D4AF37]" />
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-300">
            Swipe through our latest transformations and design visualizations from Instagram.
          </p>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="mx-auto w-full max-w-5xl">
          <CarouselContent>
            {FEATURED_REELS.map((reel, index) => (
              <CarouselItem key={reel.id} className="p-4 md:basis-1/2 lg:basis-1/3">
                <ReelCard reel={reel} index={index} onViewed={trackReelView} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-[-40px] border-[#D4AF37] bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" />
            <CarouselNext className="right-[-40px] border-[#D4AF37] bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
