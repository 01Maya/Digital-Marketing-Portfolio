"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn, h2Class } from "@/lib/utils"

/** Shared easing so every animation on the site feels the same. */
export const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1]

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function tokenise(text: string) {
  const out: { w: string; em: boolean }[] = []
  text.split("*").forEach((segment, i) => {
    segment.split(/(\s+)/).forEach((part) => {
      if (part) out.push(/^\s+$/.test(part) ? { w: " ", em: false } : { w: part, em: i % 2 === 1 })
    })
  })
  return out
}

/** Headline whose words rise out of a mask. Wrap words in *asterisks* for italic brand colour. */
export function SplitText({ text, as: Tag = "h2", className, delay = 0 }: { text: string; as?: "h1" | "h2"; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  let n = 0
  return (
    <Tag className={className} aria-label={text.replace(/\*/g, "")}>
      {tokenise(text).map((t, i) =>
        t.w === " " ? (
          " "
        ) : (
          <span key={i} aria-hidden className="-mx-[0.04em] -mb-[0.15em] inline-block overflow-hidden px-[0.04em] pb-[0.15em] align-top">
            <motion.span
              className={cn("inline-block", t.em && "text-primary italic")}
              initial={reduce ? false : { y: "112%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease, delay: delay + n++ * 0.07 }}
            >
              {t.w}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <>
      <p className="text-muted-foreground flex items-center gap-2.5 text-[13px] font-medium tracking-[0.1em] uppercase">
        <span className="size-2 rounded-full bg-[#ff6b4a]" aria-hidden />
        {label}
      </p>
      <motion.span
        aria-hidden
        className="bg-foreground mt-3.5 block h-px w-14 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
    </>
  )
}

export function SectionHeading({ label, title, className }: { label: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-11 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-8", className)}>
      <Reveal>
        <SectionLabel label={label} />
      </Reveal>
      <SplitText text={title} className={h2Class} />
    </div>
  )
}
