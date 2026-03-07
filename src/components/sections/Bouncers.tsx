import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Maximize2 } from "lucide-react"
import SectionHeader from "../ui/SectionHeader"
import Card from "../ui/Card"
import { Button } from "../ui/Button"
import { bouncers } from "../../data/bouncers"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { Bouncer } from "../../types"

interface BouncersProps {
  onSelectBouncer?: (slug: string) => void
}

const Bouncers: React.FC<BouncersProps> = ({ onSelectBouncer }) => {
  const { ref, controls } = useScrollReveal()
  const [selectedBouncer, setSelectedBouncer] = useState<Bouncer | null>(null)

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedBouncer) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedBouncer])

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    slug?: string
  ) => {
    e.preventDefault()
    if (slug && onSelectBouncer) {
      onSelectBouncer(slug)
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="our-bouncers" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Collection"
          title="Bouncy, Beautiful & Baby-Approved"
          subtitle="Each bouncer is carefully selected for safety, style, and maximum giggles."
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {bouncers.map((bouncer) => (
            <motion.div
              key={bouncer.id}
              variants={itemVariants}
              className="flex flex-col h-full"
            >
              <Card className="flex flex-col h-full group cursor-pointer" onClick={() => setSelectedBouncer(bouncer)}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-soft-sage relative">
                  <img
                    src={bouncer.img}
                    alt={bouncer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={32} />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-h3 !text-2xl">{bouncer.name}</h3>
                  <p className="text-sm text-dark-muted mt-2">
                    {bouncer.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {bouncer.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-soft-sage text-dark-muted rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection(e, "contact", bouncer.slug);
                      }}
                      className="text-blush-rose font-medium inline-block hover:underline"
                    >
                      Reserve This Bouncer →
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Zoom */}
      <AnimatePresence>
        {selectedBouncer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBouncer(null)}
              className="absolute inset-0 bg-near-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedBouncer(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-near-black hover:bg-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-3/5 bg-soft-sage flex items-center justify-center overflow-hidden">
                <img
                  src={selectedBouncer.img}
                  alt={selectedBouncer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col">
                <div className="mb-auto overflow-y-auto">
                  <span className="text-xs font-medium text-blush-rose tracking-widest uppercase">
                    Our Collection
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                    {selectedBouncer.name}
                  </h2>
                  <p className="text-dark-muted leading-relaxed">
                    {selectedBouncer.description}
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-soft-sage flex items-center justify-center text-lg">📏</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-dark-muted/60 font-medium">Dimensions</p>
                        <p className="font-medium">{selectedBouncer.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-soft-sage flex items-center justify-center text-lg">👶</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-dark-muted/60 font-medium">Age Range</p>
                        <p className="font-medium">Ages {selectedBouncer.ageRange}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-soft-sage flex items-center justify-center text-lg">📍</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-dark-muted/60 font-medium">Setting</p>
                        <p className="font-medium">{selectedBouncer.setting}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Button className="w-full" asChild>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        scrollToSection(e, "contact", selectedBouncer.slug);
                        setSelectedBouncer(null);
                      }}
                    >
                      Book This Bouncer
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Bouncers
