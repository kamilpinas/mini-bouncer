import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import type { FAQItem } from "../../types"

interface AccordionProps {
  items: FAQItem[]
}

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-soft-sage">
      <motion.header
        initial={false}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center py-5 cursor-pointer"
      >
        <h3 className="font-medium text-lg text-near-black">{item.question}</h3>
        <div className="text-blush-rose">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-dark-muted leading-relaxed">
              {item.answer}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="max-w-5xl mx-auto">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Accordion
