"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DeckArt, type DeckKind } from "@/components/art"
import { SplitText, ease } from "@/components/reveal"
import { site } from "@/lib/data"
import { btn, btnOutline, cn, h1Class } from "@/lib/utils"

const deck: { id: DeckKind; label: string }[] = [
  { id: "search", label: "Search" },
  { id: "ads", label: "Paid ads" },
  { id: "email", label: "Email" },
  { id: "analytics", label: "Analytics" },
]

/** Resting transform for each depth in the stack (0 = front). */
const slots = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 4 },
  { x: 26, y: -22, rotate: 4, scale: 0.96, opacity: 1, zIndex: 3 },
  { x: 50, y: -42, rotate: 8, scale: 0.92, opacity: 1, zIndex: 2 },
  { x: 70, y: -60, rotate: 12, scale: 0.88, opacity: 0, zIndex: 1 },
]

function Deck() {
  const [index, setIndex] = useState(0)
  const [hold, setHold] = useState(false)
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 120, damping: 18 })
  const ry = useSpring(0, { stiffness: 120, damping: 18 })
  const next = () => setIndex((v) => (v + 1) % deck.length)

  useEffect(() => {
    if (reduce || hold) return
    const t = setInterval(() => setIndex((v) => (v + 1) % deck.length), 4500)
    return () => clearInterval(t)
  }, [reduce, hold])

  return (
    <div className="relative mx-auto w-full max-w-[360px] pt-11 pr-14 lg:mr-0 lg:ml-auto">
      <motion.div initial={{ opacity: 0, y: 40, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.4, ease, delay: 0.4 }}>
        <div
          className="relative aspect-[4/5] w-full max-w-[300px] cursor-pointer [perspective:1100px]"
          onClick={next}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => {
            setHold(false)
            rx.set(0)
            ry.set(0)
          }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 16)
            rx.set((0.5 - (e.clientY - r.top) / r.height) * 12)
          }}
        >
          <div
            aria-hidden
            className="absolute -inset-x-[12%] -inset-y-[14%] -z-10 bg-[radial-gradient(closest-side_at_30%_30%,rgba(63,63,217,.24),transparent),radial-gradient(closest-side_at_75%_72%,rgba(255,107,74,.24),transparent)] blur-3xl"
          />
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="absolute inset-0">
            {deck.map((d, k) => (
              <motion.div
                key={d.id}
                animate={slots[(k - index + deck.length) % deck.length]}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
                className="border-border absolute inset-0 overflow-hidden rounded-[26px] border bg-white shadow-[0_40px_60px_-36px_rgba(20,24,31,.45)]"
              >
                <DeckArt kind={d.id} className="size-full" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-medium">
                  0{k + 1} {d.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

<a
  href="#contact"
  aria-label="Request a free audit"
 className="bg-background absolute bottom-[-8px] right-[8px] flex size-[84px] items-center justify-center rounded-full shadow-[0_14px_30px_-14px_rgba(20,24,31,.4)] transition-transform hover:scale-110"
>
  <motion.svg
    viewBox="0 0 120 120"
    className="size-full"
    animate={reduce ? undefined : { rotate: 360 }}
    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
  >
    <defs>
      <path
        id="badge-circle"
        d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
      />
    </defs>
    <text fontSize="11.5" fontWeight={500} fill="currentColor">
      <textPath href="#badge-circle" textLength="282" lengthAdjust="spacing">
        FREE AUDIT · FREE AUDIT · FREE AUDIT ·{" "}
      </textPath>
    </text>
  </motion.svg>

  <span
    aria-hidden
    className="absolute flex size-9 items-center justify-center rounded-full bg-[#ff6b4a] text-white"
  >
    ↗
  </span>
</a>
    </div>
  )
}

/** Decorative shape that drifts with the mouse and floats on its own. */
function Shape({ mx, my, k, className, duration = 7, children }: { mx: MotionValue<number>; my: MotionValue<number>; k: number; className: string; duration?: number; children: ReactNode }) {
  const x = useTransform(mx, (v) => v * k)
  const y = useTransform(my, (v) => v * k)
  const reduce = useReducedMotion()
  return (
    <motion.span aria-hidden style={{ x, y }} className={`pointer-events-none absolute hidden md:block ${className}`}>
      <motion.span className="block" animate={reduce ? undefined : { y: [0, -18, 0], rotate: [0, 10, 0] }} transition={{ duration, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.span>
    </motion.span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -90])
  const ghostR = useTransform(scrollYProgress, [0, 1], [0, 8])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const mx = useSpring(px, { stiffness: 60, damping: 20 })
  const my = useSpring(py, { stiffness: 60, damping: 20 })
  useEffect(() => {
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [px, py])

  const fade = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease, delay } })

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-[120px] pb-20 md:pt-[148px] md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.i className="absolute top-10 -left-20 size-[420px] rounded-full bg-[#a9a9f5] opacity-30 blur-[80px]" animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.i className="absolute top-64 -right-16 size-[380px] rounded-full bg-[#ffc3ad] opacity-30 blur-[80px]" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div style={{ y: ghostY, x: ghostX, rotate: ghostR }} className="absolute top-20 -right-[2vw] font-serif text-[clamp(260px,40vw,560px)] leading-[.8] text-transparent italic select-none [-webkit-text-stroke:1px_#e3e1da]">
          R
        </motion.div>
        <Shape mx={mx} my={my} k={26} className="top-[22%] left-[2.5%]">
          <span className="block size-[54px] rounded-full border-2 border-[#ff6b4a]" />
        </Shape>
        <Shape mx={mx} my={my} k={-34} duration={9} className="top-[58%] left-[4%]">
          <span className="after:bg-primary before:bg-primary relative block size-[30px] before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 after:absolute after:top-1/2 after:left-0 after:h-0.5 after:w-full" />
        </Shape>
        <Shape mx={mx} my={my} k={-22} duration={11} className="top-[12%] right-[32%]">
          <span className="block size-20 rounded-full border-2 border-dashed border-[#1e9e6a] opacity-60" />
        </Shape>
      </div>

      <div className="relative mx-auto grid max-w-[1080px] items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div>
          <motion.p {...fade(0.55)} className="text-muted-foreground mb-5 flex items-center gap-2.5 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1e9e6a] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#1e9e6a]" />
            </span>
            Taking on new clients
          </motion.p>

          <SplitText as="h1" text="Marketing that gets you *found*, *clicked* and *chosen.*" className={h1Class} />

          <motion.p {...fade(0.75)} className="text-muted-foreground mt-7 max-w-[46ch] text-lg leading-relaxed sm:mt-6">
            I&apos;m {site.name}, a {site.role.toLowerCase()} for e-commerce, SaaS and local businesses. I work across search, paid ads and email, and report on revenue, not vanity metrics.
          </motion.p>

          <motion.div {...fade(0.9)} className="mt-8 flex flex-row gap-2 sm:mt-7 sm:items-center sm:gap-3">
            <Button asChild className={cn(btn, "h-11 min-w-0 flex-1 items-center justify-center px-2.5 text-center text-[13px] leading-none sm:w-auto sm:flex-none sm:px-6 sm:text-[15px]")}>
              <a href="#contact">Request a free audit</a>
            </Button>
            <Button asChild variant="outline" className={cn(btnOutline, "h-11 min-w-0 flex-1 items-center justify-center px-2.5 text-center text-[13px] leading-none sm:w-auto sm:flex-none sm:px-6 sm:text-[15px]")}>
              <a href="#work">See selected work</a>
            </Button>
          </motion.div>
        </div>

        <Deck />
      </div>

      <dl className="border-border relative mx-auto mt-14 grid max-w-[1080px] grid-cols-2 gap-x-5 gap-y-7 border-t px-5 pt-6 sm:grid-cols-3 sm:gap-5 md:px-8 lg:gap-8">
        {site.facts.map(([dt, dd], i) => (
          <motion.div
            key={dt}
            {...fade(1.05 + i * 0.1)}
            className={cn("min-w-0", i === 2 && "col-span-2 sm:col-span-1")}
          >
            <dt className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase sm:text-[13px]">
              {dt}
            </dt>
            <dd className="mt-1.5 font-serif text-[17px] leading-snug sm:mt-1 sm:text-lg">
              {dd}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  )
}
