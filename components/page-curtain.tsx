"use client"

import { motion, useReducedMotion } from "framer-motion"

export function PageCurtain() {
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.5, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
        className="bg-background absolute inset-y-0 left-0 w-1/2 will-change-transform"
      />
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
        className="bg-background absolute inset-y-0 right-0 w-1/2 will-change-transform"
      />
    </motion.div>
  )
}
