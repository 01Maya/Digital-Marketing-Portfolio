
"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { CreativeArt, creativeCount } from "@/components/art"
import { SectionHeading, ease } from "@/components/reveal"
import { cn } from "@/lib/utils"

export function Creative() {
  const rail = useRef<HTMLDivElement>(null)

  const drag = useRef({
    down: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  })

  const stop = () => {
    const element = rail.current

    drag.current.down = false

    if (
      element &&
      element.hasPointerCapture(drag.current.pointerId)
    ) {
      element.releasePointerCapture(drag.current.pointerId)
    }

    element?.classList.remove("cursor-grabbing", "snap-none")
  }

  return (
    <section id="creative" className="pb-20 md:pb-24">
<div className="mx-auto max-w-[1080px] px-5 pt-3 md:px-8 md:pt-0">
  <SectionHeading
    label="Creative"
    title="A sample of the creative I direct."
  />
</div>

      {/* Draggable horizontal creative gallery */}
      <div
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label="Creative samples, scroll sideways"
        className="flex w-full cursor-grab snap-x snap-mandatory touch-pan-x select-none overflow-x-auto overscroll-x-contain pl-10 pr-5 pt-3 pb-9 [scrollbar-width:none] [scroll-behavior:auto] md:pl-16 md:pr-8 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !rail.current) return

          drag.current = {
            down: true,
            moved: false,
            startX: e.clientX,
            scrollLeft: rail.current.scrollLeft,
            pointerId: e.pointerId,
          }

          rail.current.setPointerCapture(e.pointerId)
          rail.current.classList.add(
            "cursor-grabbing",
            "snap-none",
          )
        }}
        onPointerMove={(e) => {
          if (!drag.current.down || !rail.current) return

          const delta = e.clientX - drag.current.startX

          // Ignore tiny movements to avoid accidental dragging.
          if (Math.abs(delta) > 4) {
            drag.current.moved = true
          }

          if (drag.current.moved) {
            e.preventDefault()

            // Direct pointer tracking avoids lag during dragging.
            rail.current.scrollLeft =
              drag.current.scrollLeft - delta
          }
        }}
        onPointerUp={stop}
        onPointerCancel={stop}
        onLostPointerCapture={() => {
          drag.current.down = false
          rail.current?.classList.remove(
            "cursor-grabbing",
            "snap-none",
          )
        }}
      >
        <div className="mx-auto flex w-max shrink-0 gap-[18px]">
          {Array.from({ length: creativeCount }, (_, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.9,
                ease,
                delay: i * 0.08,
              }}
              whileHover={{ y: -8, rotate: -1 }}
              className={cn(
                "border-border m-0 w-[190px] shrink-0 snap-start overflow-hidden rounded-[18px] border shadow-[0_24px_40px_-30px_rgba(20,24,31,.4)] md:w-[210px]",
                i % 2 === 0 && "mt-6",
              )}
            >
              <CreativeArt
                index={i}
                className="pointer-events-none block aspect-[300/380] w-full"
              />
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <p className="text-muted-foreground text-[13px]">
          Placeholder compositions. Replace them with your real ads
          and social posts. Drag or scroll sideways.
        </p>
      </div>
    </section>
  )
}
