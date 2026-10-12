"use client"

import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, SectionHeading, ease } from "@/components/reveal"
import { testimonials } from "@/lib/data"
import { btnOutline, cn } from "@/lib/utils"

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
}

export function KindWords() {
  const [[index, dir], setPage] = useState<[number, number]>([0, 1])
  const [hold, setHold] = useState(false)
  const reduce = useReducedMotion()
  const n = testimonials.length

  const go = (d: number) => {
    if (n > 1) {
      setPage(([i]) => [(i + d + n) % n, d])
    }
  }

  const t = testimonials[index]

  useEffect(() => {
    if (reduce || hold || n <= 1) return

    const id = setInterval(() => {
      setPage(([i]) => [(i + 1) % n, 1])
    }, 7000)

    return () => clearInterval(id)
  }, [reduce, hold, n])

  if (!n) return null

  return (
    <section id="kind-words" className="pb-12 md:pb-16">
      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <SectionHeading
          label="Kind words"
          title="What clients say."
          className="md:grid-cols-1"
        />

        <Reveal>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            className="mt-2 pt-0 md:mt-3 md:pt-0"
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null
                )
              ) {
                setHold(false)
              }
            }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:gap-12">
              <div className="min-w-0 overflow-hidden">
                <AnimatePresence
                  mode="wait"
                  custom={dir}
                  initial={false}
                >
                  <motion.figure
                    key={index}
                    custom={dir}
                    variants={variants}
                    initial={reduce ? false : "enter"}
                    animate="center"
                    exit={reduce ? undefined : "exit"}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease,
                    }}
                    drag={reduce ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 60) {
                        go(info.offset.x < 0 ? 1 : -1)
                      }
                    }}
                    className="m-0 cursor-grab active:cursor-grabbing"
                  >
                    <blockquote className="m-0 max-w-[42em] font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.4]">
                      “{t.quote}”
                    </blockquote>

                    <figcaption className="mt-4 text-[15px] text-muted-foreground">
                      <b className="font-medium text-foreground">
                        {t.name}
                      </b>{" "}
                      · {t.role}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            {/* Original arrow buttons and pagination */}
            <div className="mt-4 flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                disabled={n <= 1}
                className={cn(btnOutline, "w-12 px-0")}
              >
                <ArrowLeft className="size-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                disabled={n <= 1}
                className={cn(btnOutline, "w-12 px-0")}
              >
                <ArrowRight className="size-5" />
              </Button>

              <div className="ml-3 flex">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() =>
                      setPage([i, i > index ? 1 : -1])
                    }
                    className="group flex h-11 w-10 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "block h-1 rounded-full transition-all duration-300",
                        i === index
                          ? "w-11 bg-primary"
                          : "w-7 bg-border group-hover:bg-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
