import type React from "react"
import "@/app/globals.css"

export default function IDELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden h-screen">
      {children}
    </div>
  )
}
