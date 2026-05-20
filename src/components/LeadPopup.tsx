'use client'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react'

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    budget: '',
  })

  // Listen for the global event dispatched by buttons and the engagement hook
  useEffect(() => {
    const openPopup = () => setIsOpen(true)
    window.addEventListener('open-lead-popup', openPopup)
    return () => window.removeEventListener('open-lead-popup', openPopup)
  }, [])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      const { data, error, status } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            project_type: formData.projectType,
            budget: formData.budget,
            interested: true,
          },
        ])
        .select();

      if (error || !data) {
        const errMsg = error?.message ?? `Insert failed with status ${status}`;
        throw new Error(errMsg);
      }


      setSubmitted(true)
      toast.success('Thank you! We will reach out to you shortly.', {
        description: 'Our design team will contact you within 24 hours.',
        duration: 5000,
      })

      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', city: '', projectType: '', budget: '' })
      }, 2500)
    } catch (err: any) {
      // Log the full error object for debugging
      // Log the full error object for debugging
      console.error('Supabase insert error:', err);
      // Extract a useful message for the user
      const errorMessage = (err?.message ?? err?.details ?? JSON.stringify(err)) || 'Something went wrong. Please try again or contact us directly.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] bg-[#080808] border border-[#D4AF37]/30 text-white p-0 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.15)]">

        {/* Gold header band */}
        <div className="bg-gradient-to-r from-[#AA8A2A] via-[#D4AF37] to-[#AA8A2A] h-1 w-full" />

        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">Free Design Consultation</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-white leading-tight">
              Let&apos;s Design Your<br />Dream Space
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 font-light">
              Fill in your details and our expert design team will reach out within 24 hours with a personalised estimate.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <CheckCircle2 className="w-14 h-14 text-[#D4AF37]" />
              <p className="text-lg font-semibold text-white">We&apos;ve received your request!</p>
              <p className="text-gray-400 text-sm">Our team will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name" className="text-gray-300 text-xs uppercase tracking-wider">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="Daphne"
                    className="bg-[#111] border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder:text-gray-600 rounded-none"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone" className="text-gray-300 text-xs uppercase tracking-wider">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    placeholder="+91 98765 43210"
                    className="bg-[#111] border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder:text-gray-600 rounded-none"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="email" className="text-gray-300 text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  className="bg-[#111] border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder:text-gray-600 rounded-none"
                  autoComplete="email"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="city" className="text-gray-300 text-xs uppercase tracking-wider">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleChange('city')}
                    placeholder="Mumbai"
                    className="bg-[#111] border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder:text-gray-600 rounded-none"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="projectType" className="text-gray-300 text-xs uppercase tracking-wider">Project Type</Label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange('projectType')}
                    placeholder="Villa, Apartment…"
                    className="bg-[#111] border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder:text-gray-600 rounded-none"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="budget" className="text-gray-300 text-xs uppercase tracking-wider">Budget Range</Label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange('budget')}
                  className="bg-[#111] border border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white rounded-none px-3 py-2 text-sm outline-none"
                >
                  <option value="" className="bg-black">Select your budget</option>
                  <option value="Under ₹5L" className="bg-black">Under ₹5 Lakhs</option>
                  <option value="₹5L–₹10L" className="bg-black">₹5–10 Lakhs</option>
                  <option value="₹10L–₹25L" className="bg-black">₹10–25 Lakhs</option>
                  <option value="₹25L–₹50L" className="bg-black">₹25–50 Lakhs</option>
                  <option value="₹50L+" className="bg-black">₹50 Lakhs+</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37] rounded-none uppercase tracking-widest text-xs font-bold py-6 mt-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  'Request Free Estimate →'
                )}
              </Button>

              <p className="text-[10px] text-gray-600 text-center">
                No spam. We only contact you about your project.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
