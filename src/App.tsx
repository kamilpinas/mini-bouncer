import { useState } from "react"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import Bouncers from "./components/sections/Bouncers"
import HowItWorks from "./components/sections/HowItWorks"
import WhyUs from "./components/sections/WhyUs"
import Testimonials from "./components/sections/Testimonials"
import Gallery from "./components/sections/Gallery"
import FAQ from "./components/sections/FAQ"
import Contact from "./components/sections/Contact"
import { HelmetProvider } from "react-helmet-async"

function App() {
  const [selectedBouncerSlug, setSelectedBouncerSlug] = useState<string | null>(
    null,
  )

  const handleSelectBouncer = (slug: string) => {
    setSelectedBouncerSlug(slug)
  }

  const handleClearSelection = () => {
    setSelectedBouncerSlug(null)
  }

  return (
    <HelmetProvider>
      <div className="bg-soft-sage">
        <Navbar />
        <main>
          <Hero />
          <Bouncers onSelectBouncer={handleSelectBouncer} />
          <HowItWorks />
          <WhyUs />
          <Testimonials />
          <Gallery />
          <FAQ />
          <Contact
            bouncerSlug={selectedBouncerSlug}
            onClearSelection={handleClearSelection}
          />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
