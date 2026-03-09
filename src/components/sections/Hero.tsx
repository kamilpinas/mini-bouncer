import React from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "../ui/Button"
import { ChevronDown } from "lucide-react"

const Hero: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        block: "start",
      })
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-soft-sage overflow-hidden py-20 px-4"
    >
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-[10px] sm:text-xs mt-4 font-medium text-blush-rose tracking-widest uppercase px-2"
          >
            ☁️ Volo's Cutest Bounce House Rentals
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-hero leading-tight mt-8 font-serif px-2"
          >
            Make Their Little Day Unforgettable
          </motion.h1>

          <div className="relative mt-8 group max-w-5xl mx-auto border-2 border-soft-sage rounded-2xl">
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden"
            >
              <video
                className="w-full h-full object-cover block"
                src="castle.mp4"
                poster="castle.jpg"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative sm:absolute sm:inset-0 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl md:rounded-3xl p-4 mt-8 sm:mt-0"
            >
              <Button
                asChild
                size="default"
                className="w-full sm:w-auto sm:text-xs md:text-base shadow-lg sm:mb-16"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                >
                  Book Bouncer
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="default"
                className="w-full sm:w-auto sm:text-xs md:text-base bg-white/80 backdrop-blur-sm shadow-lg sm:mb-16"
              >
                <a
                  href="#our-bouncers"
                  onClick={(e) => scrollToSection(e, "our-bouncers")}
                >
                  Our Bouncers
                </a>
              </Button>
            </motion.div>
          </div>
          <motion.p
            variants={itemVariants}
            className="mt-8 text-base md:text-xl text-dark-muted max-w-5xl mx-auto px-4"
          >
            Modern, clean, and oh-so-adorable bounce houses delivered right to
            your backyard. Stress-free party magic for the littlest guests.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 text-[10px] sm:text-sm text-dark-muted flex flex-wrap justify-center gap-x-4 gap-y-2 px-4"
          >
            <span>✓ Sanitized Before Every Rental</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Same-Day Setup</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ No Deposit Required</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a
          href="#our-bouncers"
          aria-label="Scroll down"
          onClick={(e) => scrollToSection(e, "our-bouncers")}
        >
          <ChevronDown className="w-8 h-8 text-blush-rose" />
        </a>
      </motion.div>
    </section>
  )
}

export default Hero
