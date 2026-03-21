import React from "react"
import { motion, type Variants } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { Calendar, Truck, Heart } from "lucide-react"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const steps = [
  {
    icon: Calendar,
    title: "Pick Your Date & Bouncer",
    description:
      "Browse our collection, choose your favorite, and select your party date. We'll confirm availability.",
  },
  {
    icon: Truck,
    title: "We Deliver & Set Up",
    description:
      "Our team arrives early and sets up your bounce house exactly where you want it. No stress.",
  },
  {
    icon: Heart,
    title: "Bounce, Play, Repeat!",
    description:
      "Let the little ones bounce their hearts out! When the party's over, we come back, pack up, and leave your space spotless.",
  },
]

const HowItWorks: React.FC = () => {
  const { ref, controls } = useScrollReveal()
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
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
    <section id="how-it-works" className="py-20 md:py-32 bg-soft-sage">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Simple as 1-2-3"
          title="Party Planning, Simplified"
          subtitle="We handle the heavy lifting so you can focus on the fun."
        />
        <div className="relative">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white rounded-3xl p-8 text-center z-10"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 text-8xl font-bold text-blush-rose/10 z-0">
                  0{index + 1}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blush-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-blush-rose" />
                  </div>
                  <h3 className="text-xl font-serif text-near-black">
                    {step.title}
                  </h3>
                  <p className="text-dark-muted mt-2">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div
            className="absolute top-1/2 left-0 w-full h-px bg-blush-rose/20 hidden md:block"
            style={{ transform: "translateY(-50%)" }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
