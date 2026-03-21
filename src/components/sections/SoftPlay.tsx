import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  Sparkles,
  Calendar,
  Baby,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const images = ["soft-1.jpg", "soft-2.jpg", "soft-3.jpg"]

const SoftPlay: React.FC = () => {
  const { ref, controls } = useScrollReveal()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="soft-play" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="relative bg-soft-sage/20 rounded-[48px] p-8 md:p-16 border border-soft-sage/30 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Decorative floating elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-blush-rose/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-soft-sage/40 rounded-full blur-3xl" />

          <div className="w-full md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-soft-sage/50 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blush-rose animate-pulse" />
              <span className="text-[10px] font-bold text-near-black uppercase tracking-widest">
                New for 2026
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-near-black mb-6 leading-tight">
              Coming Soon: <br />
              <span className="text-blush-rose italic">Soft Play Sets</span>
            </h2>

            <p className="text-lg text-dark-muted mb-8 leading-relaxed max-w-xl">
              A soft, safe play area with climbers, slide and ball pit where
              little ones can explore, play and have fun during the celebration.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white">
                <div className="w-12 h-12 bg-soft-sage rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-near-black" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-dark-muted font-bold">
                    Timeline
                  </p>
                  <p className="font-medium text-near-black">Starting in May</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white">
                <div className="w-12 h-12 bg-blush-rose/10 rounded-xl flex items-center justify-center">
                  <Baby className="w-6 h-6 text-blush-rose" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-dark-muted font-bold">
                    Best For
                  </p>
                  <p className="font-medium text-near-black">Ages 0-4 Years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square relative rounded-[40px] overflow-hidden shadow-2xl bg-white group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Soft play preview ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-near-black/40 to-transparent pointer-events-none" />

              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-near-black hover:bg-white transition-colors shadow-lg z-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-near-black hover:bg-white transition-colors shadow-lg z-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Dots - Moved higher up to avoid overlap */}
              <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === i ? "bg-white w-6" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl">
                  <p className="text-xs font-bold text-near-black uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-blush-rose" /> Now
                    accepting inquiries
                  </p>
                  <p className="text-[10px] text-dark-muted leading-relaxed">
                    Be the first to have a modern soft play set at your event.
                    Mention "Soft Play" in your booking request!
                  </p>
                </div>
              </div>
            </div>

            {/* Visual flourishes */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-soft-sage rounded-3xl -rotate-12 flex items-center justify-center shadow-lg border-4 border-white z-20">
              <span className="text-2xl">🧸</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blush-rose rounded-3xl rotate-12 flex items-center justify-center shadow-lg border-4 border-white z-20">
              <span className="text-2xl">🥳</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SoftPlay
