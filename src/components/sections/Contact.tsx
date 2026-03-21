import React, { useState, useMemo } from "react"
import emailjs from "@emailjs/browser"
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
  Loader2,
  User,
  Phone,
  MessageCircleHeart,
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
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  // Date and Time State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bouncer: bouncerSlug || "",
    duration: "Up to 6 hours",
    message: "",
  })

  // Update bouncer if slug changes from outside
  React.useEffect(() => {
    if (bouncerSlug) {
      setFormData((prev) => ({ ...prev, bouncer: bouncerSlug }))
      setFormErrors((prev) => ({ ...prev, bouncer: false }))
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
    return selectedBouncerData.price
  }, [selectedBouncerData])

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, boolean> = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      bouncer: !formData.bouncer,
      location: !formData.location.trim(),
      date: !selectedDate,
      time: !selectedTime,
    }

    setFormErrors(errors)

    if (Object.values(errors).some((error) => error)) {
      const formElement = document.getElementById("booking-form")
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsLoading(true)

    try {
      const templateParams = {
        bouncer_name: selectedBouncerData?.name || formData.bouncer,
        location: formData.location,
        date: selectedDate?.toLocaleDateString(),
        time: selectedTime,
        duration: formData.duration,
        price: currentPrice,
        user_name: formData.name,
        user_phone: formData.phone,
        message: formData.message,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to send email:", error)
      alert("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleBouncerSelect = (slug: string) => {
    setFormData((prev) => ({ ...prev, bouncer: slug }))
    setFormErrors((prev) => ({ ...prev, bouncer: false }))
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
                      setFormData({
                        name: "",
                        phone: "",
                        location: "",
                        bouncer: "",
                        duration: "Up to 6 hours",
                        message: "",
                      })
                      setFormErrors({})
                    }}
                  >
                    Back to Booking
                  </Button>
                </div>
              ) : (
                <form
                  id="booking-form"
                  onSubmit={handleSubmit}
                  className="flex-grow space-y-12"
                  noValidate
                >
                  {/* Step 1: Bouncer Choice */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.bouncer
                            ? "text-red-500"
                            : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.bouncer
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          1
                        </span>
                        The Bouncer{" "}
                        {formErrors.bouncer && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Please select one)
                          </span>
                        )}
                      </label>
                      {formData.bouncer && (
                        <button
                          type="button"
                          onClick={() => {
                            onClearSelection()
                            setFormData((prev) => ({ ...prev, bouncer: "" }))
                            setFormErrors({})
                          }}
                          className="text-sm font-bold text-blush-rose uppercase tracking-widest flex items-center gap-2 hover:opacity-70"
                        >
                          <RotateCcw size={10} /> Reset
                        </button>
                      )}
                    </div>
                    <div
                      className={twMerge(
                        "grid grid-cols-4 gap-4 p-1 rounded-[28px] transition-all",
                        formErrors.bouncer
                          ? "ring-2 ring-red-500/20 bg-red-500/5"
                          : "",
                      )}
                    >
                      {bouncers.map((bouncer) => {
                        const isSelected = formData.bouncer === bouncer.slug
                        return (
                          <button
                            key={bouncer.id}
                            type="button"
                            onClick={() => handleBouncerSelect(bouncer.slug)}
                            className={twMerge(
                              "group relative aspect-square rounded-[24px] overflow-hidden border-2 transition-all duration-500 ",
                              isSelected
                                ? "border-blush-rose ring-8 ring-blush-rose/5 scale-105 shadow-xl"
                                : "border-transparent hover:border-soft-sage hover:scale-102",
                              formErrors.bouncer && !isSelected
                                ? "border-red-500/30"
                                : "",
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
                      <label className="text-sm font-bold text-near-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-5 h-5 bg-soft-sage rounded-full flex items-center justify-center text-[9px] text-near-black">
                          2
                        </span>
                        How Long?
                      </label>
                      <div className="py-3 px-5 rounded-xl border-2 border-near-black bg-near-black text-white shadow-md font-serif text-base">
                        Up to 6 hours
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.location
                            ? "text-red-500"
                            : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.location
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          3
                        </span>
                        Where?{" "}
                        {formErrors.location && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Required)
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g. Volo, IL"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className={twMerge(
                          "w-full px-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black placeholder:text-dark-muted/40 focus:outline-none",
                          formErrors.location
                            ? "border-red-500 bg-red-500/5 focus:ring-4 focus:ring-red-500/5"
                            : "border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                        )}
                      />
                    </div>
                  </div>

                  {/* Step 4 & 5: Schedule with Dropdowns */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.date ? "text-red-500" : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.date
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          4
                        </span>
                        Which Day?{" "}
                        <span className="text-[9px] opacity-50 lowercase tracking-normal ml-1">
                          (mm/dd/yyyy)
                        </span>
                        {formErrors.date && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Required)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <CalendarDays
                          className={twMerge(
                            "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors",
                            formErrors.date
                              ? "text-red-500"
                              : "text-blush-rose",
                          )}
                          size={18}
                        />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setSelectedDate(
                              e.target.value
                                ? new Date(e.target.value + "T00:00:00")
                                : null,
                            )
                            if (e.target.value)
                              setFormErrors((prev) => ({
                                ...prev,
                                date: false,
                              }))
                          }}
                          className={twMerge(
                            "w-full pl-12 pr-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black appearance-none focus:outline-none",
                            formErrors.date
                              ? "border-red-500 bg-red-500/5 focus:ring-4 focus:ring-red-500/5"
                              : "border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.time ? "text-red-500" : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.time
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          5
                        </span>
                        What Time?{" "}
                        {formErrors.time && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Required)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <Clock
                          className={twMerge(
                            "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors",
                            formErrors.time
                              ? "text-red-500"
                              : "text-blush-rose",
                          )}
                          size={18}
                        />
                        <select
                          required
                          disabled={!selectedDate}
                          value={selectedTime}
                          onChange={(e) => {
                            setSelectedTime(e.target.value)
                            if (e.target.value)
                              setFormErrors((prev) => ({
                                ...prev,
                                time: false,
                              }))
                          }}
                          className={twMerge(
                            "w-full pl-12 pr-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black appearance-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
                            formErrors.time
                              ? "border-red-500 bg-red-500/5 focus:ring-4 focus:ring-red-500/5"
                              : "border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                          )}
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

                  {/* Step 6 & 7: Contact Info */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.name ? "text-red-500" : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.name
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          6
                        </span>
                        Your Name{" "}
                        {formErrors.name && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Required)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <User
                          className={twMerge(
                            "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors",
                            formErrors.name
                              ? "text-red-500"
                              : "text-blush-rose",
                          )}
                          size={18}
                        />
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={twMerge(
                            "w-full pl-12 pr-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black placeholder:text-dark-muted/40 focus:outline-none",
                            formErrors.name
                              ? "border-red-500 bg-red-500/5 focus:ring-4 focus:ring-red-500/5"
                              : "border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors",
                          formErrors.phone ? "text-red-500" : "text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors",
                            formErrors.phone
                              ? "bg-red-500 text-white"
                              : "bg-soft-sage text-near-black",
                          )}
                        >
                          7
                        </span>
                        Phone Number{" "}
                        {formErrors.phone && (
                          <span className="ml-2 text-[10px] tracking-normal lowercase opacity-70">
                            (Required)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <Phone
                          className={twMerge(
                            "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors",
                            formErrors.phone
                              ? "text-red-500"
                              : "text-blush-rose",
                          )}
                          size={18}
                        />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className={twMerge(
                            "w-full pl-12 pr-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black placeholder:text-dark-muted/40 focus:outline-none",
                            formErrors.phone
                              ? "border-red-500 bg-red-500/5 focus:ring-4 focus:ring-red-500/5"
                              : "border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    <div className="space-y-4">
                      <label
                        className={twMerge(
                          "text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors text-near-black",
                        )}
                      >
                        <span
                          className={twMerge(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors bg-soft-sage text-near-black",
                          )}
                        >
                          8
                        </span>
                        Message{" "}
                      </label>
                      <div className="relative">
                        <MessageCircleHeart
                          className={twMerge(
                            "absolute left-4 top-[1rem] pointer-events-none transition-colors text-blush-rose",
                          )}
                          size={18}
                        />
                        <textarea
                          name="message"
                          required
                          placeholder="Enter your message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className={twMerge(
                            "w-full pl-12 pr-5 py-3 rounded-xl border-2 transition-all bg-soft-sage/5 text-sm font-medium text-near-black placeholder:text-dark-muted/40 focus:outline-none border-soft-sage/30 focus:border-blush-rose/60 focus:ring-4 focus:ring-blush-rose/5",
                          )}
                        />
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
                                  month: "numeric",
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
                  <div className="flex items-center gap-4 text-xs font-medium text-white/60 hover:text-white transition-colors">
                    <span className="w-[14px] flex items-center justify-center text-[10px]">
                      📞
                    </span>
                    <a href="tel:2246079212">224-607-9212</a>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    form="booking-form"
                    className="w-full py-4 text-lg group rounded-[24px] shadow-2xl bg-white text-near-black hover:bg-blush-rose hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                    disabled={isSubmitted || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <span className="flex items-center text-[9px] font-bold text-white/30 uppercase tracking-widest">
                      <Check size={10} className="mr-1.5 text-green-500" /> No
                      Deposit
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
