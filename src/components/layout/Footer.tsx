import React from "react"
import { Mail, MapPin, Instagram } from "lucide-react"

const Footer: React.FC = () => {
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
    }
  }

  return (
    <footer className="bg-near-black text-soft-sage">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white">Mini Bouncer ☁️</h3>
            <p className="text-sm text-soft-sage/70 mt-2">
              Making little moments unforgettable.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="uppercase tracking-wide text-sm font-semibold text-blush-rose mb-3">
              Navigate
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, "home")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#our-bouncers"
                  onClick={(e) => scrollToSection(e, "our-bouncers")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Our Bouncers
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => scrollToSection(e, "how-it-works")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => scrollToSection(e, "pricing")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => scrollToSection(e, "faq")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="uppercase tracking-wide text-sm font-semibold text-blush-rose mb-3">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-soft-sage/70">
                <MapPin size={16} className="mr-2" /> Chicagoland
              </li>
              <li className="flex items-center text-sm text-soft-sage/70">
                <Mail size={16} className="mr-2" />{" "}
                <a
                  href="mailto:minibouncerfoxlake@gmail.com"
                  className="hover:text-white transition"
                >
                  minibouncerfoxlake@gmail.com
                </a>
              </li>
              <li className="flex items-center text-sm text-soft-sage/70">
                <Instagram size={16} className="mr-2" />{" "}
                <a
                  href="https://instagram.com/mini.bouncer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  @mini.bouncer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal / Newsletter (Optional) */}
          <div>
            <h4 className="uppercase tracking-wide text-sm font-semibold text-blush-rose mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-soft-sage/70 hover:text-white transition"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-12 text-center">
          <p className="text-xs text-soft-sage/50">
            © {new Date().getFullYear()} Mini Bouncer. All rights reserved. Made
            with 💕 in Chicagoland.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
