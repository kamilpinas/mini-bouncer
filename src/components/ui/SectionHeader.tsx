import React from "react"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={`text-center max-w-5xl mx-auto mb-12 md:mb-16 ${className}`}
    >
      <motion.p className="text-xs font-medium text-blush-rose tracking-widest uppercase">
        {label}
      </motion.p>
      <motion.h2 className="text-h2 mt-2">{title}</motion.h2>
      {subtitle && (
        <motion.p className="mt-4 text-lg text-dark-muted max-w-xl mx-auto">
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader
