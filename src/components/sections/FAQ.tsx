import React from "react"
import SectionHeader from "../ui/SectionHeader"
import Accordion from "../ui/Accordion"
import { faqs } from "../../data/faqs"
import { motion, type Variants } from "framer-motion"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const FAQ: React.FC = () => {
  const { ref, controls } = useScrollReveal()
  const variants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Got Questions?"
          title="Frequently Asked Questions"
        />
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
        >
          <Accordion items={faqs} />
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
