import React from "react"
import { motion, type Variants } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { useScrollReveal } from "../../hooks/useScrollReveal"

const Gallery: React.FC = () => {
  const { ref, controls } = useScrollReveal()

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const photos = [
    {
      id: 1,
      url: `/gallery-1.jpg`,
      link: "https://www.instagram.com/p/DJfHBtfSYi6",
    },
    {
      id: 2,
      url: `/gallery-2.jpg`,
      link: "https://www.instagram.com/p/C8zmw_UuEcC",
    },
    {
      id: 3,
      url: `/gallery-3.jpg`,
      link: "https://www.instagram.com/p/CzjXP1cuLGZ",
    },
    {
      id: 4,
      url: `/gallery-4.jpg`,
      link: "https://www.instagram.com/p/Cx1Yvn9Ocn3",
    },
    {
      id: 5,
      url: `/gallery-5.jpg`,
      link: "https://www.instagram.com/p/CxRlZJ2Ou8D/",
    },
    {
      id: 6,
      url: `/gallery-6.jpg`,
      link: "https://www.instagram.com/p/Cv5XaWfOjgv",
    },
    {
      id: 7,
      url: `/gallery-7.jpg`,
      link: "https://www.instagram.com/p/CvlOi-0O45u",
    },
    {
      id: 8,
      url: `/gallery-8.jpg`,
      link: "https://www.instagram.com/p/CvDWpXtuo5l",
    },
  ]

  return (
    <section id="gallery" className="py-20 md:py-32 bg-soft-sage">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="@MINI.BOUNCER"
          title="The Cutest Parties in Chicagoland"
          subtitle="Follow us on Instagram for party inspo and behind-the-scenes cuteness."
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {photos.map((photo) => (
            <motion.a
              key={photo.id}
              href={photo.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="aspect-square rounded-2xl overflow-hidden bg-blush-rose/10 relative group block"
            >
              <img
                src={photo.url}
                alt={`Mini Bouncer Gallery ${photo.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  View on Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/mini.bouncer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blush-rose font-medium hover:underline inline-flex items-center gap-2"
          >
            Follow @mini.bouncer →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Gallery
