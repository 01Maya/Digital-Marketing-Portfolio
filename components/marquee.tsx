"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { site } from "@/lib/data"
import { cn } from "@/lib/utils"

function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** One marquee row. It speeds up the faster the page is scrolled. `speed` is % of one copy per second. */
function Row({ speed, outline }: { speed: number; outline?: boolean }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const hovering = useRef(false)
  const reduce = useReducedMotion()

  useAnimationFrame((_, delta) => {
    if (reduce || hovering.current) return
    const move = speed * (delta / 1000)
    baseX.set(baseX.get() + move + move * boost.get())
  })

  const copy = (key: string) => (
    <div key={key} className="flex shrink-0 gap-20 pr-20">
      {site.tools.map((tool) => (
        <span
          key={tool}
          className={cn("font-serif text-2xl whitespace-nowrap italic", outline ? "text-transparent [-webkit-text-stroke:1px_#5f646d]" : "text-muted-foreground")}
        >
          {tool}
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden py-4" onPointerEnter={() => (hovering.current = true)} onPointerLeave={() => (hovering.current = false)}>
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {copy("a")}
        {copy("b")}
      </motion.div>
    </div>
  )
}

export function Marquee() {
  return (
    <div aria-hidden className="border-border mt-8 border-y py-5">
      <Row speed={-2.2} />
    </div>
  )
}
