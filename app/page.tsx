import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Creative } from "@/components/creative"
import { Faq } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { KindWords } from "@/components/kind-words"
import { Marquee } from "@/components/marquee"
import { Navbar } from "@/components/navbar"
import { SelectedWork } from "@/components/selected-work"
import { Services } from "@/components/services"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <SelectedWork />
        <Creative />
        <Services />
        <About />
        <KindWords />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
