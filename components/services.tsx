
"use client"

import { useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { ServiceArt } from "@/components/art"
import { Reveal, SectionHeading, ease } from "@/components/reveal"
import { services, type Service } from "@/lib/data"
import { btn, cn, h3Class } from "@/lib/utils"

const artBg: Record<Service["id"], string> = {
  seo: "bg-[#e7e5fa]",
  ads: "bg-[#ffe3d6]",
  email: "bg-[#d6f2e6]",
  analytics: "bg-[#fff3c9]",
}

const AUTO_SECONDS = 8

const mobileLabels: Record<Service["id"], string> = {
  seo: "SEO",
  ads: "Paid ads",
  email: "Email",
  analytics: "Analytics",
}

function MobileProgressRing({
  progress,
  auto,
  reduce,
}: {
  progress: ReturnType<typeof useMotionValue<number>>
  auto: boolean
  reduce: boolean | null
}) {
  const background = useTransform(progress, (value) => {
    const percentage = auto && !reduce ? value * 100 : 0

    return `conic-gradient(from -90deg, #3f3fd9 0%, #3f3fd9 ${percentage}%, rgb(255 255 255 / 20%) ${percentage}%, rgb(255 255 255 / 20%) 100%)`
  })

  return (
    <motion.span
      aria-hidden
      style={{
        background,
        padding: 2,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      }}
      className="pointer-events-none absolute inset-0 z-0 rounded-full lg:hidden"
    />
  )
}

// Soft entrance animation for each service panel.
const rise = (reduce: boolean | null) => ({
  initial: { opacity: 0, y: reduce ? 0 : 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: reduce ? 0 : 0.4, ease },
})

function Panel({ service }: { service: Service }) {
  const reduce = useReducedMotion()

  // Preselect the service in the contact form and scroll to it.
  const choose = () => {
    window.dispatchEvent(
      new CustomEvent("select-service", {
        detail: service.short,
      }),
    )

    document.getElementById("contact")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    })
  }

  return (
    <motion.div
      {...rise(reduce)}
      whileHover={reduce ? undefined : { y: -3 }}
      className="group border-foreground/10 bg-card overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgba(20,24,31,.04),0_20px_40px_-32px_rgba(20,24,31,.28)] transition-shadow duration-300 hover:shadow-[0_8px_24px_-16px_rgba(20,24,31,.35)] motion-reduce:transition-none"
    >
      {/* Illustration banner */}
      <div
        className={cn(
          "h-36 overflow-hidden transition-colors duration-300 group-hover:brightness-[1.02] sm:h-40 lg:h-44",
          artBg[service.id],
        )}
      >
        <ServiceArt
          id={service.id}
          className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Heading, description, and CTA */}
          <div className="min-w-0">
            <p className="text-primary font-serif text-base italic">
              {service.number} · {service.short}
            </p>

            <h3 className={cn("mt-1 mb-3", h3Class)}>
              {service.headline}
            </h3>

            <p className="text-muted-foreground mb-5 text-[15px] leading-6">
              {service.description}
            </p>

            <Button
              onClick={choose}
              className={cn(btn, "min-h-11 hidden lg:inline-flex")}
            >
              Get a free audit
            </Button>
          </div>

          {/* Deliverables */}
          <div className="min-w-0">
            <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.1em] uppercase">
              What you get
            </h4>

            <ul>
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="group/item border-border flex items-start gap-2.5 border-b py-2.5 text-[15px] leading-6 transition-colors duration-200 hover:bg-muted/50 last:border-b-0"
                >
                  <Check
                    className="text-primary mt-1 size-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="min-w-0">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service metadata */}
        <dl className="bg-muted/50 mt-5 grid grid-cols-1 gap-3 rounded-xl px-4 py-3.5 sm:grid-cols-3 sm:gap-6">
          {service.meta.map(([dt, dd]) => (
            <div key={dt} className="min-w-0">
              <dt className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase">
                {dt}
              </dt>
              <dd className="mt-1 text-[15px] leading-6 [overflow-wrap:anywhere]">
                {dd}
              </dd>
            </div>
          ))}
        </dl>

        <Button
          onClick={choose}
          className={cn(btn, "mt-5 min-h-11 lg:hidden")}
        >
          Get a free audit
        </Button>
      </div>
    </motion.div>
  )
}

export function Services() {
  const [active, setActive] = useState<Service["id"]>(services[0].id)
  const [auto, setAuto] = useState(false)

  const activeRef = useRef<Service["id"]>(services[0].id)
  const activeIndex = services.findIndex(
    (service) => service.id === active,
  )

  const reduce = useReducedMotion()
  const progress = useMotionValue(0)

  const selectService = (serviceId: Service["id"]) => {
    activeRef.current = serviceId
    progress.set(0)
    setActive(serviceId)
  }

  // One animation clock drives the progress line and service rotation.
  useAnimationFrame((_, delta) => {
    if (!auto || reduce) return

    const nextProgress =
      progress.get() + delta / 1000 / AUTO_SECONDS

    if (nextProgress >= 1) {
      const currentIndex = services.findIndex(
        (service) => service.id === activeRef.current,
      )

      const nextIndex = (currentIndex + 1) % services.length
      const nextService = services[nextIndex].id

      selectService(nextService)
    } else {
      progress.set(nextProgress)
    }
  })

  return (
    <section id="services" className="py-12 md:py-16">
      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <SectionHeading
          label="Services"
          title="What I can take off your plate."
        />

        <Reveal>
          <motion.div
            onViewportEnter={() => setAuto(true)}
            viewport={{ amount: "some", once: true }}
          >
            <Tabs
              value={active}
              orientation="vertical"
              onValueChange={(value) =>
                selectService(value as Service["id"])
              }
              className="grid gap-4 lg:grid-cols-[0.7fr_1.6fr] lg:gap-8"
            >
              {/* Service navigation */}
              <TabsList
                aria-label="Services"
                className="grid w-full grid-cols-4 gap-1.5 rounded-none bg-transparent pb-1 sm:gap-2 lg:flex lg:flex-col lg:items-stretch lg:gap-0"
              >
                {services.map((service, index) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className={cn(
                      "text-muted-foreground border-border bg-card focus-visible:ring-ring/50 relative isolate h-full min-h-11 w-full min-w-0 justify-center rounded-full border px-1 py-2 text-center text-[clamp(0.6875rem,3.6vw,0.9375rem)] leading-tight font-medium whitespace-nowrap shadow-none transition-colors focus-visible:ring-2 sm:px-2",
                      "data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none",
                      "lg:w-full lg:justify-start lg:rounded-none lg:border-0 lg:border-t lg:bg-transparent lg:px-0 lg:py-4 lg:text-left lg:font-serif lg:text-[clamp(1.35rem,2vw,1.6rem)] lg:font-normal lg:whitespace-normal",
                      index === activeIndex + 1 && "lg:border-t-0",
                      "lg:hover:pl-2 lg:hover:text-foreground lg:data-[state=active]:bg-transparent lg:data-[state=active]:pl-2 lg:data-[state=active]:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 hidden w-9 shrink-0 font-serif text-base lg:inline-block",
                        active === service.id && "text-primary",
                      )}
                    >
                      {service.number}
                    </span>

                    <span className="relative z-10 lg:hidden">
                      {mobileLabels[service.id]}
                    </span>

                    <span className="relative z-10 hidden lg:inline">
                      {service.title}
                    </span>

                    {active === service.id && (
                      <>
                        <MobileProgressRing
                          progress={progress}
                          auto={auto}
                          reduce={reduce}
                        />

                        <motion.i
                          aria-hidden
                          style={{
                            scaleX:
                              auto && !reduce ? progress : 0,
                          }}
                          className="bg-primary absolute bottom-[-1px] left-0 hidden h-[2px] w-full origin-left lg:block"
                        />
                      </>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Active service panel */}
              {services.map((service) => (
                <TabsContent
                  key={service.id}
                  value={service.id}
                  className="mt-0 outline-none"
                >
                  <Panel service={service} />
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </Reveal>

        <p className="text-muted-foreground mt-4 text-[13px] leading-5">
          Timelines are typical ranges, not guarantees. Every plan
          starts with a free audit.
        </p>
      </div>
    </section>
  )
}
