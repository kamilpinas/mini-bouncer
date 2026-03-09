import React, { useState, useMemo } from "react"
import {
  MapPin,
  Mail,
  Instagram,
  RotateCcw,
  Send,
  CheckCircle2,
  Check,
  Clock,
  CalendarDays,
  Sparkles,
} from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { bouncers } from "../../data/bouncers"
import { Button } from "../ui/Button"
import { twMerge } from "tailwind-merge"

interface ContactProps {
  bouncerSlug?: string | null
  onClearSelection: () => void
}

const Contact: React.FC<ContactProps> = ({ bouncerSlug, onClearSelection }) => {
  const { ref, controls } = useScrollReveal()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Date and Time State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const [formData, setFormData] = useState({
    location: "",
    bouncer: bouncerSlug || "",
    duration: "4 hours",
  })

  // Update bouncer if slug changes from outside
  React.useEffect(() => {
    if (bouncerSlug) {
      setFormData((prev) => ({ ...prev, bouncer: bouncerSlug }))
    }
  }, [bouncerSlug])

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Find selected bouncer for pricing
  const selectedBouncerData = useMemo(() => {
    return bouncers.find((b) => b.slug === formData.bouncer)
  }, [formData.bouncer])

  const currentPrice = useMemo(() => {
    if (!selectedBouncerData) return null
    return formData.duration === "4 hours"
      ? selectedBouncerData.pricing.fourHours
      : selectedBouncerData.pricing.sixHours
  }, [selectedBouncerData, formData.duration])

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !formData.bouncer) {
      alert("Please select a bouncer, date, and time.")
      return
    }
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBouncerSelect = (slug: string) => {
    setFormData((prev) => ({ ...prev, bouncer: slug }))
  }

  const handleDurationSelect = (duration: string) => {
    setFormData((prev) => ({ ...prev, duration }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-soft-sage/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          {/* Main Container with Split Layout */}
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white flex flex-col lg:flex-row min-h-[600px]">
            {/* LEFT SIDE: The Form */}
            <div className="lg:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-soft-sage rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12 text-near-black" />
                  </div>
                  <h3 className="font-serif text-4xl text-near-black mb-4">
                    See you soon!
                  </h3>
                  <p className="text-dark-muted text-lg max-w-md leading-relaxed">
                    We've received your request for the{" "}
                    <span className="text-near-black font-semibold">
                      {selectedBouncerData?.name}
                    </span>
                    . We'll contact you shortly to confirm the details.
                  </p>
                  <Button
                    className="mt-12 px-10 py-6 text-lg"
                    variant="secondary"
                    onClick={() => {
                      setIsSubmitted(false)
                      setSelectedDate(null)
                      setSelectedTime("")
                    }}
                  >
                    Back to Booking
                  </Button>
                </div>
              ) : (
                <form id="booking-form" onSubmit={handleSubmit} className="flex-grow space-y-12">
                  {/* Step 1: Bouncer Choice */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[8px] text-near-black">
                          1
                        </span>
                        The Bouncer
                      </label>
                      {formData.bouncer && (
                        <button
                          type="button"
                          onClick={() => {
                            onClearSelection()
                            setFormData((prev) => ({ ...prev, bouncer: "" }))
                          }}
                          className="text-[10px] font-bold text-blush-rose uppercase tracking-widest flex items-center gap-2 hover:opacity-70"
                        >
                          <RotateCcw size={10} /> Reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {bouncers.map((bouncer) => {
                        const isSelected = formData.bouncer === bouncer.slug
                        return (
                          <button
                            key={bouncer.id}
                            type="button"
                            onClick={() => handleBouncerSelect(bouncer.slug)}
                            className={twMerge(
                              "group relative aspect-square rounded-[24px] overflow-hidden border-2 transition-all duration-500",
                              isSelected
                                ? "border-blush-rose ring-8 ring-blush-rose/5 scale-105 shadow-xl"
                                : "border-transparent hover:border-soft-sage hover:scale-102",
                            )}
                          >
                            <img
                              src={bouncer.img}
                              alt={bouncer.name}
                              className={twMerge(
                                "w-full h-full object-cover transition-all duration-700",
                                isSelected
                                  ? "scale-110"
                                  : "grayscale-[0.4] group-hover:grayscale-0",
                              )}
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-blush-rose/10 flex items-center justify-center">
                                <div className="bg-white rounded-full p-2 shadow-lg">
                                  <Check
                                    size={16}
                                    className="text-blush-rose"
                                    strokeWidth={3}
                                  />
                                </div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 2 & 3: Options & Location */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[8px] text-near-black">
                          2
                        </span>
                        How Long?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["4 hours", "6 hours"].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => handleDurationSelect(d)}
                            className={twMerge(
                              "py-3 rounded-xl border-2 font-serif text-base transition-all duration-300",
                              formData.duration === d
                                ? "border-near-black bg-near-black text-white shadow-md"
                                : "border-soft-sage/40 hover:border-soft-sage text-dark-muted",
                            )}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[8px] text-near-black">
                          3
                        </span>
                        Where?
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g. Volo, IL"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-5 py-3 rounded-xl border-2 border-soft-sage/30 focus:outline-none focus:border-near-black transition-all bg-soft-sage/5 text-sm font-medium text-near-black placeholder:text-dark-muted/40"
                      />
                    </div>
                  </div>

                  {/* Step 4 & 5: Schedule with Dropdowns */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[8px] text-near-black">
                          4
                        </span>
                        Which Day?
                      </label>
                      <div className="relative">
                        <CalendarDays
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-blush-rose pointer-events-none"
                          size={18}
                        />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) =>
                            setSelectedDate(
                              e.target.value
                                ? new Date(e.target.value + "T00:00:00")
                                : null,
                            )
                          }
                          className="w-full pl-12 pr-5 py-3 rounded-xl border-2 border-soft-sage/30 focus:outline-none focus:border-near-black transition-all bg-soft-sage/5 text-sm font-medium text-near-black appearance-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[8px] text-near-black">
                          5
                        </span>
                        What Time?
                      </label>
                      <div className="relative">
                        <Clock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-blush-rose pointer-events-none"
                          size={18}
                        />
                        <select
                          required
                          disabled={!selectedDate}
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full pl-12 pr-5 py-3 rounded-xl border-2 border-soft-sage/30 focus:outline-none focus:border-near-black transition-all bg-soft-sage/5 text-sm font-medium text-near-black appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            {selectedDate
                              ? "Select start time"
                              : "Pick a date first"}
                          </option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT SIDEBAR: The Pass */}
            <div className="lg:w-1/3 bg-near-black p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Abstract decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blush-rose/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-sage/10 rounded-full blur-3xl -ml-32 -mb-32" />

              <div className="relative z-10">
                <div className="mb-12">
                  <span className="text-[10px] font-bold text-blush-rose uppercase tracking-[0.3em] mb-2 block">
                    Step by Step
                  </span>
                  <h2 className="text-4xl font-serif leading-tight">
                    Ready to <br />
                    <span className="text-blush-rose italic">Book?</span>
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Selected Bouncer Pass */}
                  <div className="relative">
                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-1 h-12 bg-blush-rose rounded-r-full" />
                    {formData.bouncer ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10">
                            <img
                              src={selectedBouncerData?.img}
                              alt={selectedBouncerData?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-serif text-xl leading-tight">
                              {selectedBouncerData?.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-soft-sage/60 text-xs">
                              <Clock size={12} />
                              <span>{formData.duration} rental</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 py-3 border-y border-white/10">
                          <CalendarDays size={16} className="text-blush-rose" />
                          <p className="text-sm font-medium">
                            {selectedDate
                              ? selectedDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Pick a date"}
                            {selectedTime && ` at ${selectedTime}`}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-soft-sage/40 uppercase tracking-widest font-bold">
                            Estimated Total
                          </span>
                          <span className="text-3xl font-serif text-blush-rose">
                            {currentPrice}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-3xl">
                        <Sparkles
                          className="mx-auto mb-2 text-white/20"
                          size={24}
                        />
                        <p className="text-sm text-white/30 italic px-6">
                          Select your bouncer to build your pass
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Contact Details & Submit */}
              <div className="relative z-10 pt-12 mt-12 border-t border-white/10 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-medium text-white/60 hover:text-white transition-colors">
                    <MapPin size={14} className="text-blush-rose" />
                    <span>Volo, IL & surrounding suburbs</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-white/60 hover:text-white transition-colors">
                    <Mail size={14} className="text-blush-rose" />
                    <a href="mailto:minibouncerfoxlake@gmail.com">
                      minibouncerfoxlake@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-white/60 hover:text-white transition-colors">
                    <Instagram size={14} className="text-blush-rose" />
                    <a
                      href="https://instagram.com/mini.bouncer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @mini.bouncer
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    form="booking-form"
                    className="w-full py-6 text-xl group rounded-[24px] shadow-2xl bg-white text-near-black hover:bg-blush-rose hover:text-white transition-all duration-300"
                    disabled={
                      !selectedDate || !selectedTime || !formData.bouncer || isSubmitted
                    }
                  >
                    Confirm Booking Request
                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <span className="flex items-center text-[9px] font-bold text-white/30 uppercase tracking-widest">
                      <Check size={10} className="mr-1.5 text-green-500" /> No
                      Deposit
                    </span>
                    <span className="flex items-center text-[9px] font-bold text-white/30 uppercase tracking-widest">
                      <Check size={10} className="mr-1.5 text-green-500" /> Free
                      Delivery
                    </span>
                    <span className="flex items-center text-[9px] font-bold text-white/30 uppercase tracking-widest">
                      <Check size={10} className="mr-1.5 text-green-500" />{" "}
                      Sanitized
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
