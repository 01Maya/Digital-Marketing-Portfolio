
"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeading, ease } from "@/components/reveal"
import { faqs } from "@/lib/data"

export function Faq() {
  const midpoint = Math.ceil(faqs.length / 2)

  const columns = [
    faqs.slice(0, midpoint),
    faqs.slice(midpoint),
  ]

  return (
    <section id="faq" className="pb-20 md:pb-24">
      <div className="mx-auto max-w-270 px-5 md:px-8">
        <SectionHeading
          label="FAQ"
          title="Questions I hear often."
          className="md:grid-cols-1"
        />

        <div className="mt-10 grid grid-cols-1 gap-x-12 md:mt-12 md:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="min-w-0">
              {column.map((f, i) => (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    ease,
                    delay: i * 0.05,
                  }}
                  className="border-t border-border last:border-b"
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem
                      value={`faq-${colIndex}-${i}`}
                      className="border-0"
                    >
                      <AccordionTrigger className="gap-4 py-5 text-left font-serif text-[clamp(1.125rem,4vw,1.5rem)] font-normal leading-snug hover:text-primary hover:no-underline">
                        <span className="text-left">
                          {f.q}
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="pb-5 text-[clamp(1rem,3.5vw,1.125rem)] leading-relaxed text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
