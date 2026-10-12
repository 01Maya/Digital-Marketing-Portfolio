
"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  value: string | undefined
  setValue: (value: string) => void
}>({
  value: undefined,
  setValue: () => {},
})

export function Accordion({
  children,
  className,
  type = "single",
  collapsible = false,
}: {
  children: React.ReactNode
  className?: string
  type?: "single"
  collapsible?: boolean
}) {
  const [value, setValue] = React.useState<string | undefined>()

  return (
    <AccordionContext.Provider
      value={{
        value,
        setValue: (next) =>
          setValue(
            next === value && collapsible ? undefined : next
          ),
      }}
    >
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = React.createContext<string>("")

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-value={value} className={className}>
      <AccordionItemContext.Provider value={value}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  )
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  const ctx = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const open = ctx.value === item

  return (
    <button
      {...props}
      type="button"
      aria-expanded={open}
      onClick={() => ctx.setValue(item)}
      className={cn(
        "flex w-full items-center justify-between text-left",
        className
      )}
    >
      {children}

      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 transition-transform duration-300",
          open && "rotate-180"
        )}
      />
    </button>
  )
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const open = ctx.value === item

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="accordion-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
          className="overflow-hidden"
        >
          <div className={cn("pb-5", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export {
  Accordion as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
}
