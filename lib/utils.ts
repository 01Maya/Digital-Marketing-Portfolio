import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Pill button looks, applied on top of shadcn's <Button>. */
export const btn =
  "h-12 rounded-full bg-foreground px-7 text-base font-medium text-background transition-colors hover:bg-primary hover:text-white"
export const btnOutline =
  "h-12 rounded-full border border-foreground bg-transparent px-7 text-base font-medium text-foreground shadow-none transition-colors hover:bg-foreground hover:text-background"

/** Type scale shared by every section. */
export const h1Class = "text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.08] tracking-[-0.025em]"
export const h2Class = "text-[clamp(1.875rem,3.3vw,2.625rem)] leading-[1.15] tracking-[-0.02em]"
export const h3Class = "text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.2] tracking-[-0.01em]"
