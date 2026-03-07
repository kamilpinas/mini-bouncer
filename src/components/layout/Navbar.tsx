import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "../ui/Button"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Bouncers", href: "#our-bouncers" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    const element = document.getElementById(id.replace("#", ""))
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex justify-between items-center">
          <a onClick={(e) => scrollToSection(e, "home")}>
            <img
              src="logo.png"
              className="object-cover w-full h-20 p-2 rounded-2xl"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm text-near-black hover:text-blush-rose transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                Book Now
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="text-near-black">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-soft-sage z-50 md:hidden"
          >
            <div className="container mx-auto px-4 h-full flex flex-col">
              <div className="h-16 flex justify-between items-center">
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, "home")}
                  className="font-serif text-2xl text-blush-rose font-medium"
                >
                  Mini Bouncer ☁️
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-near-black"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-grow flex flex-col items-center justify-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-2xl text-near-black hover:text-blush-rose transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: navLinks.indexOf(link) * 0.1 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <Button asChild size="lg" className="mt-4">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                  >
                    Book Now
                  </a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
