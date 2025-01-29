"use client"

import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { AutoResizeTextarea } from "./autoresize-textarea"

interface ChatFormProps {
  className?: string
}

export function ChatForm({ className }: ChatFormProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={cn("relative flex flex-col", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      <AutoResizeTextarea />
    </div>
  )
} 