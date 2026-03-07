import React from "react"
import { InlineWidget } from "react-calendly"
import SectionHeader from "../ui/SectionHeader"
import { MapPin, Mail, Instagram, RotateCcw } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useScrollReveal } from "../../hooks/useScrollReveal"

interface ContactProps {
  bouncerSlug?: string | null
  onClearSelection: () => void
}

const Contact: React.FC<ContactProps> = ({ bouncerSlug, onClearSelection }) => {
  const { ref, controls } = useScrollReveal()
  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const calendlyBaseUrl = "https://calendly.com/kamilpinas"
  const finalUrl = bouncerSlug
    ? `${calendlyBaseUrl}/${bouncerSlug}`
    : calendlyBaseUrl

  return (
    <section id="contact" className="py-20 md:py-32 bg-soft-sage">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="grid xl:grid-cols-3 gap-12"
        >
          <div className="xl:col-span-1">
            <SectionHeader
              label="Let's Party"
              title="Ready to Book the Fun?"
              className="text-left max-w-none mx-0 mb-8"
            />
            <p className="text-dark-muted mb-8 text-lg">
              Select a date and time that works for your event. For special
              requests or last-minute bookings, feel free to contact us
              directly!
            </p>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <MapPin className="w-5 h-5 text-blush-rose" />
                  </div>
                  <span className="font-medium">Serving all of Chicagoland</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <Mail className="w-5 h-5 text-blush-rose" />
                  </div>
                  <a
                    href="mailto:minibouncerfoxlake@gmail.com"
                    className="hover:underline font-medium"
                  >
                    minibouncerfoxlake@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <Instagram className="w-5 h-5 text-blush-rose" />
                  </div>
                  <a
                    href="https://instagram.com/mini.bouncer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                  >
                    @mini.bouncer
                  </a>
                </div>
              </div>
              
              <div className="bg-white/50 p-6 rounded-2xl border border-white/50">
                <h4 className="font-serif text-xl text-near-black mb-3">
                  Operating Hours:
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-dark-muted">Mon–Fri:</span>
                    <span className="font-medium">9AM – 7PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-muted">Sat–Sun:</span>
                    <span className="font-medium">8AM – 8PM</span>
                  </div>
                </div>
              </div>
            </div>

            {bouncerSlug && (
              <div className="mt-8 p-4 bg-blush-rose/10 rounded-xl border border-blush-rose/20 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-blush-rose uppercase tracking-widest mb-2">
                  Selected Bouncer
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-serif text-xl capitalize text-near-black">
                    {bouncerSlug.replace(/-/g, " ")}
                  </p>
                  <button
                    onClick={() => {
                      window.location.href = "#contact"
                      onClearSelection()
                    }}
                    className="p-2 hover:bg-white rounded-full transition-all text-blush-rose shadow-sm"
                    title="Clear selection"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-2 bg-white rounded-3xl overflow-hidden shadow-soft h-[600px] md:h-[850px] relative border border-white">
            <InlineWidget
              key={finalUrl} // Force re-mount when URL changes
              url={finalUrl}
              styles={{
                height: "100%",
                width: "100%",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "C8AAA8",
                textColor: "5C5C5C",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
