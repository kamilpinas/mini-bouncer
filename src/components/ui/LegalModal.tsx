import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: "privacy" | "terms"
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const content = {
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Information We Collect",
          text: "When you book a rental with Mini Bouncer, we collect personal information such as your name, delivery address, phone number, and email address to fulfill your request and communicate about your event.",
        },
        {
          heading: "How We Use Your Information",
          text: "We use your information strictly for business operations: scheduling deliveries, processing payments via third-party providers (Zelle, PayPal, Cash), and sending event-related updates. We do not sell your data to third parties.",
        },
        {
          heading: "Data Security",
          text: "We take reasonable measures to protect your personal information. However, please note that no method of transmission over the internet is 100% secure. Payment details are handled through secure third-party platforms.",
        },
        {
          heading: "Illinois Privacy Rights",
          text: "In accordance with Illinois law, you have the right to request access to or deletion of your personal data. Contact us at minibouncerfoxlake@gmail.com for any data-related inquiries.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      sections: [
        {
          heading: "Booking & Payments",
          text: "No deposit is required to secure your date. Full payment is due at the time of delivery via Zelle, PayPal, or Cash. By booking, you agree to provide a safe and clear space for the bouncer setup.",
        },
        {
          heading: "Weather & Rain Policy",
          text: "Safety first! We do not set up in the rain. If rain or unsafe wind conditions are expected, the rental will be canceled or rescheduled at no cost to you. We reserve the right to cancel if conditions are deemed unsafe for children or equipment.",
        },
        {
          heading: "Delivery & Setup",
          text: "We provide free delivery within 15 miles of Volo, IL. Locations outside this radius may incur a travel fee. Renters must ensure a flat, clean surface (grass, turf, or indoor) and adequate ceiling/overhead clearance for the equipment.",
        },
        {
          heading: "Liability & Safety",
          text: "Adult supervision is required at all times while children are using the equipment. Mini Bouncer is not liable for injuries resulting from improper use, lack of supervision, or failure to follow safety rules provided at setup. Renters assume all responsibility for the equipment during the rental period.",
        },
        {
          heading: "Equipment Care",
          text: "No shoes, food, drinks, sharp objects, silly string, or pets are allowed inside the bounce house. Any damage beyond normal wear and tear or excessive cleaning required due to prohibited items will result in a damage/cleaning fee.",
        },
      ],
    },
  }

  const current = content[type]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-near-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[32px] overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col max-h-[85vh]"
          >
            <div className="p-6 md:p-8 border-b border-soft-sage/30 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-serif text-near-black">
                {current.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-soft-sage/30 rounded-full text-near-black hover:bg-soft-sage transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {current.sections.map((section, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-blush-rose">
                      {section.heading}
                    </h3>
                    <p className="text-sm md:text-base text-dark-muted leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
                <div className="pt-8 border-t border-soft-sage/30">
                  <p className="text-[10px] text-dark-muted uppercase tracking-widest font-medium">
                    Last Updated: March 2026 · Volo, IL
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default LegalModal
