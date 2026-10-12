
"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { ease } from "@/components/reveal"
import { site } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t border-[#2a303c] bg-foreground text-sm text-[#aeb4c0]">
      {/* Signature */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-[1080px] overflow-hidden px-5 pt-6 md:px-8 md:pt-8"
      >
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
          className="mx-auto w-fit whitespace-nowrap text-center font-serif text-[clamp(3.5rem,11vw,9.5rem)] leading-none italic text-transparent [-webkit-text-stroke:1px_#3a4150] transition-colors duration-500 hover:text-[#aeb0ff] hover:[-webkit-text-stroke-color:#aeb0ff]"
        >
          {site.name}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-5 px-5 pb-6 pt-8 sm:flex-row sm:items-center md:px-8 md:pb-7 md:pt-10">
        <p className="m-0 text-xs leading-6 text-[#aeb4c0] sm:text-sm">
          © {new Date().getFullYear()} {site.name}, {site.role}
        </p>

        <ul
          aria-label="Social media and contact"
          className="m-0 flex list-none items-center gap-2 p-0"
        >
          {[
            {
              label: "Instagram",
              href: "https://www.instagram.com/",
              Icon: Instagram,
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/",
              Icon: Linkedin,
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/",
              Icon: Facebook,
            },
          ].map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#414958] text-[#aeb4c0] transition-colors duration-200 hover:border-[#aeb0ff] hover:bg-[#aeb0ff]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#aeb0ff] motion-reduce:transition-none"
              >
                <Icon aria-hidden="true" className="size-[18px]" />
              </a>
            </li>
          ))}

          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.name}`}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#414958] text-[#aeb4c0] transition-colors duration-200 hover:border-[#aeb0ff] hover:bg-[#aeb0ff]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#aeb0ff] motion-reduce:transition-none"
            >
              <Mail aria-hidden="true" className="size-[18px]" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
