"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { site } from "@/lib/data"
import { btn, cn } from "@/lib/utils"

const ids = site.nav.map((n) => n.href.slice(1))

export function Navbar() {
  const [active, setActive] = useState("")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Highlight the link of the section in the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const cta = (
    <Button asChild className={cn(btn, "inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-center text-sm leading-none sm:px-5")}>
      <a href="#contact">Free audit</a>
    </Button>
  )

  return (
    <header className="border-border bg-background/85 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md">
      <motion.div aria-hidden style={{ scaleX }} className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left" />
      <div className="mx-auto flex h-[60px] max-w-[1080px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="font-serif text-[22px]">
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => {
            const current = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={cn("group hover:text-foreground relative py-3 text-[15px] transition-colors", current ? "text-foreground" : "text-muted-foreground")}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn("bg-primary absolute inset-x-0 bottom-2 h-px origin-left transition-transform duration-300", current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")}
                />
              </a>
            )
          })}
          {cta}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {cta}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-11 rounded-full" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-20">
              <SheetClose asChild>
                <a href="#top" className="absolute left-6 top-5 font-serif text-[22px]">
                  {site.name}
                </a>
              </SheetClose>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
              <nav aria-label="Mobile" className="flex flex-col px-6 pb-6">
                {[...site.nav, { label: "Contact", href: "#contact" }].map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a href={item.href} className="border-border border-b py-2 font-serif text-[clamp(2rem,9vw,2.75rem)] leading-tight">
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a href="#contact" className={cn(btn, "mt-5 inline-flex h-12 items-center justify-center px-5 text-center text-sm leading-none")}>
                    Free audit
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
