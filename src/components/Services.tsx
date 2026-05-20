'use client'
import { motion } from 'framer-motion'
import { Home, Lightbulb, Building, PenTool } from 'lucide-react'

const services = [
  {
    title: 'Residential Design',
    description: 'Transforming houses into luxurious homes tailored to your lifestyle and taste.',
    icon: Home,
  },
  {
    title: 'Commercial Spaces',
    description: 'Creating productive and stunning environments for your business and clients.',
    icon: Building,
  },
  {
    title: 'Modular Kitchens',
    description: 'State-of-the-art modular setups combining aesthetic elegance with functional mastery.',
    icon: Lightbulb,
  },
  {
    title: 'Custom Renovations',
    description: 'Bespoke remodeling services to breathe new life into your existing spaces.',
    icon: PenTool,
  },
]

export function Services() {
  return (
    <section className="py-24 bg-black relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our <span className="text-[#D4AF37]">Services</span>
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Comprehensive interior design solutions for modern luxury living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#050505] p-8 border border-gray-900 hover:border-[#D4AF37]/50 transition-colors duration-300 group"
            >
              <service.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{service.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
