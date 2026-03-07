import React from "react"
import { motion, type Variants } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import Card from "../ui/Card"
import { testimonials } from "../../data/testimonials"
import { Star } from "lucide-react"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const Testimonials: React.FC = () => {
  const { ref, controls } = useScrollReveal()
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
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
    <section id="testimonials" className="py-20 md:py-32 bg-soft-sage">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Happy Mamas"
          title="Loved by 200+ Chicagoland Families"
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="p-8 h-full flex flex-col">
                <span className="font-serif text-5xl text-blush-rose/40">
                  "
                </span>
                <p className="italic text-base leading-relaxed text-near-black flex-grow">
                  {testimonial.quote}
                </p>
                <div className="w-12 h-[2px] bg-blush-rose my-4"></div>
                <p className="font-bold text-near-black">
                  — {testimonial.name}
                </p>
                <p className="text-sm text-dark-muted">
                  {testimonial.location} · {testimonial.eventType}
                </p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-blush-rose fill-current"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
