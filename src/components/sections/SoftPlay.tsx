import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Maximize2, Check, Ruler, Clock } from "lucide-react"
import SectionHeader from "../ui/SectionHeader"
import Card from "../ui/Card"
import { Button } from "../ui/Button"
import {
  softPlayOptions,
  softPlayAddons,
  softPlayBundle,
} from "../../data/softPlay"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { SoftPlay as SoftPlayType } from "../../types"

interface SoftPlayProps {
  onSelectSoftPlay?: (slug: string) => void
}

const SoftPlay: React.FC<SoftPlayProps> = ({ onSelectSoftPlay }) => {
  const { ref: optionsRef, controls: optionsControls } = useScrollReveal()
  const { ref: addonsRef, controls: addonsControls } = useScrollReveal()
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
    <section id="soft-play" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Soft Play"
          title="Safe, Clean & Elegant Play Areas"
          subtitle="Modern soft play setups designed for toddlers to explore, learn, and have endless fun in a safe environment."
        />

        <motion.div
          ref={optionsRef}
          variants={containerVariants}
          initial="hidden"
          animate={optionsControls}
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
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-soft-sage relative">
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
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-h3 !text-2xl">{option.name}</h3>

                  <div className="mt-4 space-y-2 flex-grow">
                    <div className="p-3 bg-soft-sage/10 rounded-xl border border-soft-sage/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-dark-muted/60 uppercase tracking-wider flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> Up to 6 hours
                        </span>
                        <span className="text-lg font-serif text-near-black">
                          {option.price}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pt-2">
                      <li className="flex items-start text-xs">
                        <Ruler className="w-3.5 h-3.5 text-blush-rose mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-muted">
                          {option.spaceRequired} Space Required
                        </span>
                      </li>
                      {option.includes.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start text-xs">
                          <Check className="w-3.5 h-3.5 text-blush-rose mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-dark-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-soft-sage/20 flex items-center justify-between">
                    <button className="text-[11px] font-bold text-dark-muted/40 uppercase tracking-widest hover:text-blush-rose focus:outline-none focus:text-blush-rose transition-colors">
                      View Details
                    </button>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.stopPropagation()
                        scrollToSection(e, "contact", option.slug)
                      }}
                      className="bg-blush-rose text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blush-rose/90 transition-all shadow-sm shadow-blush-rose/20"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-Ons Section */}
        <motion.div
          ref={addonsRef}
          variants={containerVariants}
          initial="hidden"
          animate={addonsControls}
          className="mt-24 border-t border-soft-sage/20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-serif mb-4">Add-Ons</h3>
            <p className="text-dark-muted text-base italic max-w-2xl mx-auto">
              Take your setup to the next level with our favorite extras!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {softPlayAddons.map((addon, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[320px] flex flex-col"
              >
                <Card className="flex flex-col h-full group">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-soft-sage relative">
                    <img
                      src={addon.img}
                      alt={addon.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-serif text-near-black">
                      {addon.name}
                    </h3>

                    <div className="mt-4 p-3 bg-soft-sage/10 rounded-xl border border-soft-sage/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-dark-muted/60 uppercase tracking-wider">
                          Add-on Price
                        </span>
                        <span className="text-lg font-serif text-near-black">
                          {addon.price}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-soft-sage/20">
                      <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "contact")}
                        className="block w-full text-center bg-blush-rose text-white text-xs font-bold py-2.5 rounded-full hover:bg-blush-rose hover:text-white transition-all"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bundle & Save Banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-near-black rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blush-rose/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blush-rose/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-sage/10 rounded-full -ml-32 -mb-32 blur-3xl group-hover:bg-soft-sage/20 transition-colors duration-500" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-blush-rose/20 text-blush-rose text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Special Offer
              </span>
              <h3 className="text-white text-3xl md:text-4xl font-serif mb-4">
                {softPlayBundle.title}
              </h3>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                {softPlayBundle.description}
              </p>
              <Button
                variant="primary"
                className="border-white text-near-black bg-white hover:bg-blush-rose hover:text-white hover:border-blush-rose"
                asChild
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                >
                  Claim This Offer
                </a>
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-dark-muted mt-16 max-w-2xl mx-auto italic">
          📍 Free delivery up to 15 miles from Volo. Travel fees may apply for
          further locations. Contact us for custom quotes!
        </p>
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
