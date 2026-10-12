"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion"
import { Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProjectArt } from "@/components/art"
import { Reveal, SectionHeading, ease } from "@/components/reveal"
import { filters, projects, type Category, type Project } from "@/lib/data"
import { cn, h3Class } from "@/lib/utils"

function ProjectRow({ project, index, onHover }: { project: Project; index: number; onHover: (p: Project | null) => void }) {
  return (
    <motion.div
      layout
      className="border-border border-t last:border-b"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: Math.min(index, 3) * 0.08 }}
    >
      <AccordionItem value={project.slug} className="border-0">
        <AccordionTrigger
          onPointerEnter={() => onHover(project)}
          onPointerLeave={() => onHover(null)}
          className="group relative isolate grid min-h-11 w-full grid-cols-[36px_1fr_44px] items-center gap-4 rounded-none py-6 text-base transition-[padding,color] duration-300 hover:pl-3 hover:text-primary hover:no-underline md:grid-cols-[60px_1.4fr_1fr_44px] [&>svg]:hidden"
        >
          <span aria-hidden className="bg-card absolute -inset-x-4 inset-y-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-x-100" />
          <span className="text-muted-foreground font-serif text-lg font-normal">0{index + 1}</span>
          <span className={cn("font-serif font-normal", h3Class)}>{project.title}</span>
          <span className="text-muted-foreground hidden text-sm font-normal md:block">
            {project.sector} · {project.year}
          </span>
          <span className="border-border group-data-[state=open]:border-foreground group-data-[state=open]:bg-foreground group-data-[state=open]:text-background flex size-11 items-center justify-center rounded-full border transition-colors">
            <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
          </span>
        </AccordionTrigger>

        <AccordionContent className="p-0 text-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="grid gap-x-8 gap-y-6 pb-9 md:grid-cols-[60px_1.15fr_.85fr]"
          >
            <span className="hidden md:block" />
            <div>
              <dl className="space-y-5">
                {(
                  [
                    ["Challenge", project.challenge],
                    ["Approach", project.approach],
                  ] as const
                ).map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="text-primary font-serif text-lg italic">{dt}</dt>
                    <dd className="text-muted-foreground mt-1 max-w-[60ch]">{dd}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className="border-border text-muted-foreground hover:border-primary hover:text-foreground rounded-full border px-3 py-1 text-[13px] transition-colors duration-200">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {project.results.map((r) => (
                  <li key={r.label} className="border-border text-muted-foreground flex justify-between gap-3 border-b py-2.5 text-[15px]">
                    {r.label}
                    <b className="text-foreground font-medium">{r.value}</b>
                  </li>
                ))}
              </ul>
              <figure className="group border-border bg-card mt-3 overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none">
                <ProjectArt kind={project.art} className="aspect-[3/2] w-full transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" />
                <figcaption className="text-muted-foreground px-4 py-2 text-[13px]">Illustrative visual · Measured with {project.source}</figcaption>
              </figure>
            </div>
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  )
}

export function SelectedWork() {
  const [filter, setFilter] = useState<"all" | Category>("all")
  const [open, setOpen] = useState(projects[0].slug)
  const [hover, setHover] = useState<Project | null>(null)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => setCanHover(window.matchMedia("(hover: hover)").matches), [])

  // Cursor-following preview, springy and tilted by horizontal velocity.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 22 })
  const y = useSpring(my, { stiffness: 180, damping: 22 })
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-10, 10])

  const visible = projects.filter((p) => filter === "all" || p.category === filter)

  return (
    <section id="work" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <SectionHeading label="Selected work" title="Projects, with the thinking behind them." />

        <Reveal className="-mt-5 mb-8 flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-[15px] transition-[transform,color,background-color,border-color] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none",
                  filter === f.value ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-muted-foreground text-sm md:ml-auto">
            {visible.length} {visible.length === 1 ? "project" : "projects"} shown
          </p>
        </Reveal>

        <div
          onPointerMove={(e) => {
            mx.set(Math.min(e.clientX + 36, window.innerWidth - 360))
            my.set(e.clientY - 110)
          }}
        >
          <Accordion
            type="single"
            collapsible
            value={open}
            onValueChange={(v) => {
              setOpen(v)
              setHover(null)
            }}
          >
            <AnimatePresence initial={false}>
              {visible.map((p, i) => (
                <ProjectRow key={p.slug} project={p} index={i} onHover={setHover} />
              ))}
            </AnimatePresence>
          </Accordion>
        </div>
      </div>

      <AnimatePresence>
        {canHover && hover && (
          <motion.div
            aria-hidden
            style={{ x, y, rotate }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="border-border pointer-events-none fixed top-0 left-0 z-30 aspect-[3/2] w-[340px] overflow-hidden rounded-2xl border shadow-[0_30px_50px_-24px_rgba(20,24,31,.5)]"
          >
            <ProjectArt kind={hover.art} className="size-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
