import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Maximize2, Check, Clock, Ruler } from "lucide-react"
import SectionHeader from "../ui/SectionHeader"
import Card from "../ui/Card"
import { Button } from "../ui/Button"
import { softPlayOptions } from "../../data/softPlay"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { SoftPlay as SoftPlayType } from "../../types"

interface SoftPlayProps {
  onSelectSoftPlay?: (slug: string) => void
}

const SoftPlay: React.FC<SoftPlayProps> = ({ onSelectSoftPlay }) => {
  const { ref, controls } = useScrollReveal()
  const [selectedSoftPlay, setSelectedSoftPlay] = useState<SoftPlayType | null>(
    null,
  )

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedSoftPlay) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedSoftPlay])

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    slug?: string,
  ) => {
    e.preventDefault()
    if (slug && onSelectSoftPlay) {
      onSelectSoftPlay(slug)
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="soft-play" className="py-20 md:py-32 bg-soft-sage/10">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Soft Play"
          title="Safe, Clean & Elegant Play Areas"
          subtitle="Modern soft play setups designed for toddlers to explore, learn, and have endless fun in a safe environment."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {softPlayOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={itemVariants}
              className="flex flex-col h-full"
            >
              <Card
                className="flex flex-col h-full group cursor-pointer"
                onClick={() => setSelectedSoftPlay(option)}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white relative">
                  <img
                    src={option.img}
                    alt={option.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Maximize2
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                      size={32}
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-sm font-serif text-near-black font-bold">
                      {option.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif text-near-black mb-3">
                    {option.name}
                  </h3>
                  <p className="text-sm text-dark-muted mb-6 line-clamp-2">
                    {option.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-dark-muted/60 uppercase tracking-wider">
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Space: {option.spaceRequired}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-soft-sage/20">
                      <button className="text-[11px] font-bold text-dark-muted/40 uppercase tracking-widest hover:text-blush-rose transition-colors">
                        View Items
                      </button>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.stopPropagation()
                          scrollToSection(e, "contact", option.slug)
                        }}
                        className="bg-blush-rose text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blush-rose/90 transition-all shadow-sm shadow-blush-rose/20"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Details */}
      <AnimatePresence>
        {selectedSoftPlay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSoftPlay(null)}
              className="absolute inset-0 bg-near-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] overflow-hidden max-w-7xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedSoftPlay(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-near-black hover:bg-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 bg-soft-sage flex items-center justify-center overflow-hidden">
                <img
                  src={selectedSoftPlay.img}
                  alt={selectedSoftPlay.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-2/5 m-8 md:m-12 flex flex-col overflow-y-auto">
                <div className="mb-auto">
                  <span className="text-xs font-medium text-blush-rose tracking-widest uppercase">
                    Soft Play Collection
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-2">
                    {selectedSoftPlay.name}
                  </h2>
                  <p className="text-dark-muted leading-relaxed text-sm mb-2">
                    {selectedSoftPlay.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-[10px] font-bold text-near-black uppercase tracking-widest">
                        Pricing
                      </p>
                      <p className="text-xl font-serif text-near-black">
                        {selectedSoftPlay.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-near-black uppercase tracking-widest">
                        Space Required
                      </p>
                      <p className="text-sm font-medium">
                        {selectedSoftPlay.spaceRequired}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-near-black uppercase tracking-widest">
                      What's Included:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {selectedSoftPlay.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-dark-muted"
                        >
                          <Check className="w-4 h-4 text-blush-rose mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12">
                  <Button className="w-full" asChild>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        scrollToSection(e, "contact", selectedSoftPlay.slug)
                        setSelectedSoftPlay(null)
                      }}
                      f
                    >
                      Reserve This Setup
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

export default SoftPlay
