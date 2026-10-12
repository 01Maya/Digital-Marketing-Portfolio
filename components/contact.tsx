"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Reveal, SplitText } from "@/components/reveal"
import { serviceOptions, site } from "@/lib/data"
import { cn, h2Class } from "@/lib/utils"

type Field = "name" | "email" | "message"

const rules: Record<Field, [(v: string) => boolean, string]> = {
  name: [(v) => v.trim().length > 1, "Please enter your name."],
  email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email address."],
  message: [(v) => v.trim().length > 9, "Please tell me a little about your goal."],
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

const control = "border-[#4a5060] bg-transparent text-white placeholder:text-[#9aa0ac] focus-visible:border-[#aeb0ff] focus-visible:ring-0 aria-invalid:border-[#ffb4a2] rounded-none border-0 border-b px-0 shadow-none"

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "", service: serviceOptions[0] })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [sent, setSent] = useState<string | null>(null)
  const [copied, setCopied] = useState<"email" | "message" | null>(null)

  // The Services section dispatches this so "Get a free audit" pre-selects its service.
  useEffect(() => {
    const onSelect = (e: Event) => setValues((v) => ({ ...v, service: (e as CustomEvent<string>).detail }))
    window.addEventListener("select-service", onSelect)
    return () => window.removeEventListener("select-service", onSelect)
  }, [])

  const flash = (what: "email" | "message") => {
    setCopied(what)
    setTimeout(() => setCopied(null), 1800)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: Partial<Record<Field, string>> = {}
    ;(Object.keys(rules) as Field[]).forEach((f) => {
      if (!rules[f][0](values[f])) next[f] = rules[f][1]
    })
    setErrors(next)
    const first = (Object.keys(next) as Field[])[0]
    if (first) return document.getElementById(`contact-${first}`)?.focus()

    const subject = `Project enquiry from ${values.name}`
    const body = `Name: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\n\n${values.message}`
    setSent(`To: ${site.email}\nSubject: ${subject}\n\n${body}`)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onChange = (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [f]: e.target.value }))
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }))
  }

  const field = (f: Field, label: string, input: ReactNode) => (
    <div className="space-y-1">
      <Label htmlFor={`contact-${f}`} className="block text-sm font-normal text-[#b4b9c4]">
        {label}
      </Label>
      {input}
      {errors[f] && (
        <p id={`contact-${f}-error`} role="alert" className="text-[13px] text-[#ffb4a2]">
          {errors[f]}
        </p>
      )}
    </div>
  )

  const aria = (f: Field) => ({ "aria-invalid": !!errors[f], "aria-describedby": errors[f] ? `contact-${f}-error` : undefined })

  return (
    <section id="contact" className="bg-foreground relative overflow-hidden py-20 text-white md:py-24">
      <motion.i aria-hidden className="bg-primary absolute -top-24 -left-24 size-[300px] rounded-full opacity-30 blur-[80px]" animate={{ x: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative mx-auto grid max-w-[1080px] gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <Reveal>
          <p className="text-[13px] font-medium tracking-[0.1em] text-[#9aa0ac] uppercase">Contact</p>
          <SplitText text="Let's talk about *your* goals." className={cn("mt-4 [&_.text-primary]:text-[#aeb0ff]", h2Class)} />
          <p className="my-5 max-w-[46ch] text-[#b4b9c4]">Tell me about your business and what you want to achieve. I reply within one working day.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="inline-block border-b border-[#aeb0ff] py-2 font-serif text-[22px]">
              {site.email}
            </a>
            <button
              type="button"
              onClick={async () => (await copyText(site.email)) && flash("email")}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#4a5060] px-4 text-sm transition-colors hover:border-[#aeb0ff] hover:bg-[#aeb0ff]/10"
            >
              {copied === "email" ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied === "email" ? "Copied" : "Copy email"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="grid gap-5">
            {field("name", "Name", <Input id="contact-name" autoComplete="name" value={values.name} onChange={onChange("name")} className={control} {...aria("name")} />)}
            {field("email", "Email", <Input id="contact-email" type="email" autoComplete="email" value={values.email} onChange={onChange("email")} className={control} {...aria("email")} />)}
            <div className="space-y-1">
              <Label htmlFor="contact-service" className="block text-sm font-normal text-[#b4b9c4]">
                Service
              </Label>
              <select
                id="contact-service"
                value={values.service}
                onChange={(e) => setValues((v) => ({ ...v, service: e.target.value }))}
                className="min-h-12 w-full border-0 border-b border-[#4a5060] bg-transparent py-3 text-base text-white focus-visible:border-[#aeb0ff] focus-visible:outline-none"
              >
                {serviceOptions.map((o) => (
                  <option key={o} value={o} className="text-foreground">
                    {o}
                  </option>
                ))}
              </select>
            </div>
            {field("message", "What do you want to achieve?", <Textarea id="contact-message" rows={3} value={values.message} onChange={onChange("message")} className={control} {...aria("message")} />)}
            <Button type="submit" className="h-12 justify-self-start rounded-full bg-white px-7 text-base font-medium text-foreground transition-colors hover:bg-[#aeb0ff]">
              Request my free audit
            </Button>
            <p className="text-[13px] text-[#9aa0ac]">All fields are required. Your details are only used to reply to your enquiry.</p>
            {sent && (
              <p role="status" className="text-sm text-[#8be0bd]">
                Your email app should open with the message ready. If nothing opens,{" "}
                <button type="button" className="underline" onClick={async () => (await copyText(sent)) && flash("message")}>
                  {copied === "message" ? "copied. Now paste it into an email." : "copy the message"}
                </button>{" "}
                and send it to {site.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
