'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

function openPopup() {
  window.dispatchEvent(new CustomEvent('open-lead-popup'))
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Reels', href: '#reels' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-[#D4AF37]/15 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Brand name */}
          <a href="#" className="flex items-center group">
            <span className="text-xl md:text-2xl font-bold tracking-wider text-white transition-colors duration-300">
              interiorsby
              <span className="text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">.daphne</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-light uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={openPopup}
              className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-none uppercase tracking-wider text-xs font-bold transition-all duration-300 px-6 py-5"
            >
              Free Consultation
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-[#D4AF37] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/15 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center text-sm font-light uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => { setIsMobileMenuOpen(false); openPopup() }}
                className="w-full bg-[#D4AF37] text-black hover:bg-[#F3E5AB] rounded-none uppercase tracking-wider text-xs font-bold transition-colors py-4 mt-2"
              >
                Free Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
