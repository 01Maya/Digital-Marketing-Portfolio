"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{ value: string; setValue: (v: string) => void }>({ value: "", setValue: () => {} })
export function Tabs({ value, onValueChange, children, className, ...props }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string; [key: string]: unknown }) { return <TabsContext.Provider value={{ value, setValue: onValueChange }}><div className={className} {...props}>{children}</div></TabsContext.Provider> }
export function TabsList({ children, className, ...props }: React.ComponentProps<"div">) { return <div role="tablist" className={className} {...props}>{children}</div> }
export function TabsTrigger({ value, children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) { const ctx = React.useContext(TabsContext); const active = ctx.value === value; return <button type="button" role="tab" aria-selected={active} data-state={active ? "active" : "inactive"} onClick={() => ctx.setValue(value)} className={cn(className)} {...props}>{children}</button> }
export function TabsContent({ value, children, className, ...props }: React.ComponentProps<"div"> & { value: string }) { const ctx = React.useContext(TabsContext); if (ctx.value !== value) return null; return <div role="tabpanel" className={className} {...props}>{children}</div> }
