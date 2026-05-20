'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(30)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Gentle intro animation to demonstrate interactivity on load
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 30
      const end = 50
      const duration = 1200 // ms
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3)
        const current = start + (end - start) * ease
        
        setSliderPosition(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [handleMove, isDragging])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [handleMove, isDragging])

  useEffect(() => {
    const stopDragging = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', stopDragging)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', stopDragging)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', stopDragging)
    }
  }, [handleMouseMove, handleTouchMove, isDragging])

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            The <span className="text-[#D4AF37]">Transformation</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Drag the slider to see how we turn empty spaces into luxurious homes.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[700px] rounded-sm overflow-hidden cursor-ew-resize touch-none select-none border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]"
          onMouseDown={(e) => {
            setIsDragging(true)
            handleMove(e.clientX)
          }}
          onTouchStart={(e) => {
            setIsDragging(true)
            handleMove(e.touches[0].clientX)
          }}
        >
          {/* After Image (Background) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/luxury_kitchen_after.png")' }}
          >
            <div className="absolute bottom-6 right-6 bg-black/80 border border-[#D4AF37]/50 backdrop-blur-md px-6 py-2 rounded-none text-[#F3E5AB] text-xs uppercase tracking-widest font-bold shadow-lg">
              After (3D Render)
            </div>
          </div>

          {/* Before Image (Foreground, clipped) */}
          <div 
            className="absolute inset-0 bg-cover bg-center border-r-[4px] border-[#D4AF37] z-10 shadow-[5px_0_15px_rgba(0,0,0,0.5)]"
            style={{ 
              backgroundImage: 'url("/luxury_kitchen_before.png")',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <div className="absolute bottom-6 left-6 bg-black/80 border border-gray-500/50 backdrop-blur-md px-6 py-2 rounded-none text-white text-xs uppercase tracking-widest font-bold shadow-lg">
              Before
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20 pointer-events-none rounded-full transition-transform duration-200"
            style={{ 
              left: `calc(${sliderPosition}% - 24px)`,
              transform: `translateY(-50%) ${isDragging ? 'scale(1.15)' : 'scale(1)'}` 
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-0.5 h-5 bg-[#D4AF37]" />
              <div className="w-0.5 h-5 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
