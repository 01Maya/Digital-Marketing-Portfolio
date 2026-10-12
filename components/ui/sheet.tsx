"use client"
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const SheetContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} })
export function Sheet({ children }: { children: React.ReactNode }) { const [open, setOpen] = React.useState(false); return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider> }
export function SheetTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) { const { setOpen } = React.useContext(SheetContext); return asChild ? React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, { onClick: () => setOpen(true) }) : <button onClick={() => setOpen(true)}>{children}</button> }
export function SheetClose({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) { const { setOpen } = React.useContext(SheetContext); return asChild ? React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, { onClick: () => setOpen(false) }) : <button onClick={() => setOpen(false)}>{children}</button> }
export function SheetContent({ children, className }: { side?: string; children: React.ReactNode; className?: string }) { const { open, setOpen } = React.useContext(SheetContext); if (!open) return null; return <div className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-sm"><div className={cn("border-border bg-background relative h-auto w-full border-b shadow-lg", className)}><button onClick={() => setOpen(false)} className="absolute right-5 top-5 rounded-full p-2" aria-label="Close menu"><X className="size-5" /></button>{children}</div></div> }
export function SheetTitle({ children, className }: { children: React.ReactNode; className?: string }) { return <h2 className={className}>{children}</h2> }
export function SheetDescription({ children, className }: { children: React.ReactNode; className?: string }) { return <p className={className}>{children}</p> }
