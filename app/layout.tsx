import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import "@/styles/globals.css"
import { ThemeProvider } from "@/context/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("flex h-full flex-col antialiased", inter.className)}>
        <TooltipProvider delayDuration={0}>
          <ThemeProvider>{children}</ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}

