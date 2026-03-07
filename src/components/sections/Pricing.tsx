import React from "react"
import { motion, type Variants } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { Button } from "../ui/Button"
import { pricingPlans } from "../../data/pricing"
import { Check } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { useScrollReveal } from "../../hooks/useScrollReveal"

interface PricingProps {
  onBook?: () => void
}

const Pricing: React.FC<PricingProps> = ({ onBook }) => {
  const { ref, controls } = useScrollReveal()
  
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    if (onBook) {
      onBook()
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
    <section id="pricing" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Simple Pricing"
          title="Transparent. No Hidden Fees. Ever."
          subtitle="All packages include free delivery, setup, sanitization, and pickup within our standard service area."
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={twMerge(
                "bg-white rounded-3xl p-8 border border-soft-sage h-full transition-all duration-300",
                plan.isPopular && "border-blush-rose scale-105 shadow-xl z-10",
              )}
            >
              {plan.isPopular && (
                <div className="text-center mb-4">
                  <span className="bg-blush-rose text-white text-xs uppercase tracking-widest px-4 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-serif text-near-black">
                {plan.name}
              </h3>
              <p className="text-4xl font-serif text-near-black mt-4">
                {plan.price}
              </p>
              <p className="text-dark-muted">{plan.duration}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-blush-rose mr-2 flex-shrink-0 mt-1" />
                    <span className="text-dark-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.isPopular ? "primary" : "secondary"}
                className="w-full mt-8"
              >
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, "contact")}
                >
                  Book {plan.name.split(" ")[0]} Day
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-sm text-dark-muted mt-12 max-w-5xl mx-auto">
          📍 Service area: Chicagoland & surrounding suburbs. Travel fees may
          apply for locations 30+ miles out. Contact us for custom quotes!
        </p>
      </div>
    </section>
  )
}

export default Pricing
