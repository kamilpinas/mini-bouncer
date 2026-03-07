import React from "react"
import { motion, type Variants } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import {
  Sparkles,
  Package,
  Shield,
  Palette,
  Clock,
  HeartHandshake,
} from "lucide-react"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const features = [
  {
    icon: Sparkles,
    emoji: "🧼",
    title: "Hospital-Grade Clean",
    description:
      "Every bounce house is deep-cleaned and sanitized before and after each rental. Because your babys safety is non-negotiable.",
  },
  {
    icon: Package,
    emoji: "📦",
    title: "Free Delivery & Setup",
    description:
      "We deliver, set up, and pick up — all included. You literally dont have to lift a finger.",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Fully Insured",
    description:
      "We carry full liability insurance so you can relax and enjoy the party worry-free.",
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Modern & Aesthetic",
    description:
      "No garish primary colors here. Our bouncers are neutral, chic, and Instagram-worthy.",
  },
  {
    icon: Clock,
    emoji: "⏰",
    title: "On-Time, Every Time",
    description:
      "We respect your schedule. Setup is done well before your first guest arrives.",
  },
  {
    icon: HeartHandshake,
    emoji: "💕",
    title: "Made for Littles",
    description:
      "Age-appropriate sizes, soft materials, and enclosed designs made specifically for toddlers and small children.",
  },
]

const WhyUs: React.FC = () => {
  const { ref, controls } = useScrollReveal()
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
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
    <section id="why-us" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="The Mini Bouncer Difference"
          title="Why Mamas Choose Us"
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-soft-sage rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-blush-rose/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                <feature.icon className="w-6 h-6 text-blush-rose" />
              </div>
              <h3 className="font-serif text-xl text-near-black">
                {feature.title}
              </h3>
              <p className="text-dark-muted mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
