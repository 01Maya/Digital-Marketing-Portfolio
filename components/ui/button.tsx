import * as React from "react"
import { cn } from "@/lib/utils"

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: string; size?: string }>(function Button({ className, asChild, variant = "default", size = "default", ...props }, ref) {
  if (asChild) return <span className={cn("inline-flex items-center justify-center", className)}>{props.children}</span>
  return <button ref={ref} className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", variant === "outline" ? "border bg-transparent hover:bg-accent" : "bg-primary text-primary-foreground hover:bg-primary/90", size === "icon" ? "size-10" : "px-4 py-2", className)} {...props} />
})
Button.displayName = "Button"
