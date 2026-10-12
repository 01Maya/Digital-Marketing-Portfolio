"use client"

import { useRef, type RefObject } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import { Reveal, SectionLabel, SplitText, ease } from "@/components/reveal"
import { site, steps } from "@/lib/data"
import { cn, h2Class } from "@/lib/utils"

const stickers = [
  { label: "SEO", pos: "top-[4%] left-[2%]", rotate: -8, color: "bg-[#e7e5fa] text-foreground" },
  { label: "Paid ads", pos: "top-[12%] right-[2%]", rotate: 6, color: "bg-[#ffe3d6] text-foreground" },
  { label: "Email", pos: "bottom-[10%] left-[6%]", rotate: 5, color: "bg-[#d6f2e6] text-foreground" },
  { label: "GA4", pos: "right-[4%] bottom-[6%]", rotate: -6, color: "bg-[#fff3c9] text-foreground" },
  { label: "CRO", pos: "top-0 left-[38%]", rotate: 3, color: "bg-foreground text-background" },
]

function Sticker({ label, pos, rotate, color, bounds, index }: (typeof stickers)[number] & { bounds: RefObject<HTMLDivElement | null>; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const keys: Record<string, [number, number]> = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }
  return (
    <motion.button
      type="button"
      drag
      dragConstraints={bounds}
      dragElastic={0.1}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
      whileHover={{ scale: 1.06 }}
      whileDrag={{ scale: 1.08 }}
      style={{ x, y, rotate }}
      aria-label={`${label} sticker. Drag, or use the arrow keys, to move it.`}
      onKeyDown={(e) => {
        const d = keys[e.key]
        if (!d) return
        e.preventDefault()
        x.set(x.get() + d[0])
        y.set(y.get() + d[1])
      }}
      className={cn("absolute z-10 cursor-grab touch-none rounded-full px-5 py-2.5 text-[15px] font-medium shadow-[0_10px_20px_-10px_rgba(20,24,31,.35)] select-none active:cursor-grabbing", pos, color)}
    >
      {label}
    </motion.button>
  )
}

export function About() {
  const bounds = useRef<HTMLDivElement>(null)
  const tilt = useSpring(0, { stiffness: 100, damping: 18 })

  return (
    <section id="about" className="pb-20 md:pb-24">
      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <div className="grid gap-x-16 md:grid-cols-[1.05fr_.95fr] md:grid-rows-[auto_auto_1fr]">
          <Reveal className="md:col-start-1 md:row-start-1">
            <SectionLabel label="About" />
          </Reveal>
          <SplitText text="Plain advice, clear numbers." className={cn("mt-3.5 md:col-start-1 md:row-start-2", h2Class)} />
          <Reveal className="text-muted-foreground mt-5 space-y-4 md:col-start-1 md:row-start-3" delay={0.1}>
            <p className="max-w-[56ch]">
              I have worked in digital marketing for seven years. I started in-house at an online retailer, running search and email for a catalogue of 4,000 products, and I have consulted independently since 2021.
            </p>
            <p className="max-w-[56ch]">
              I take on a small number of clients at a time so each gets my full attention. Every recommendation comes with the reason behind it, the effect I expect and how we will measure it.
            </p>
          </Reveal>

          <div
            ref={bounds}
            className="relative order-last mt-8 h-[360px] md:order-none md:col-start-2 md:row-span-3 md:row-start-1 md:mt-0 md:h-[400px] md:self-center"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              tilt.set(((e.clientX - r.left) / r.width - 0.5) * 8)
            }}
            onPointerLeave={() => tilt.set(0)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              animate={{ rotate: [0, 1.5, 0, -1.5, 0], scale: [1, 1.015, 1] }}
              style={{ rotate: tilt, x: "-50%", y: "-50%" }}
              className="absolute top-1/2 left-1/2 w-[230px] rounded-md bg-white p-3.5 pb-5 text-center shadow-[0_30px_50px_-28px_rgba(20,24,31,.5)] transition-shadow duration-300 hover:shadow-[0_36px_56px_-24px_rgba(20,24,31,.55)]"
            >
              <Image
                src="/riya-portrait.png"
                alt="Riya Shah"
                width={768}
                height={768}
                className="aspect-square w-full rounded-sm object-cover"
              />
              <p className="text-muted-foreground mt-3 font-serif text-lg italic">Hi, I&apos;m Riya.</p>
            </motion.div>
            {stickers.map((s, index) => (
              <Sticker key={s.label} {...s} index={index} bounds={bounds} />
            ))}
          </div>
        </div>

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.14 }}
              whileHover={{ y: -4 }}
              className="group relative -mx-3 rounded-lg px-3 pt-4 pb-2 transition-colors duration-300 hover:bg-card motion-reduce:transition-none"
            >
              <motion.span
                aria-hidden
                className="bg-foreground absolute inset-x-3 top-0 h-0.5 origin-left transition-colors duration-300 group-hover:bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease, delay: i * 0.14 }}
              />
              <span className="text-primary group-hover:text-foreground font-serif text-lg transition-colors duration-300">0{i + 1}</span>
              <h3 className="mb-1 font-sans text-lg font-medium">{s.title}</h3>
              <p className="text-muted-foreground text-[15px]">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
