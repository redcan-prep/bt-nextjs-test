"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon, RefreshCw, StopCircle, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useContext } from "react"
import type React from "react"
import { ThemeContext } from "@/context/ThemeContext"

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { messages, input, setInput, append, reload, stop, isLoading } = useChat({
    api: "/api/chat",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Switchboard AI Chat</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: "calc(100vh - 140px)" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "max-w-[80%] rounded-lg p-4",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {message.content}
          </div>
        ))}
        {isLoading && <div className="text-center text-muted-foreground">AI is thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="sticky bottom-0 bg-background p-4 shadow-sm space-y-4">
        <div className="relative">
          <AutoResizeTextarea
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="w-full rounded-lg bg-muted p-4 pr-12 min-h-[100px]"
            rows={3}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="absolute bottom-4 right-4 rounded-full" disabled={isLoading}>
                <ArrowUpIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Send message</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex justify-end">
          {isLoading ? (
            <Button onClick={() => stop()} variant="secondary" size="sm">
              <StopCircle className="mr-2 h-4 w-4" />
              Stop Generating
            </Button>
          ) : (
            <Button onClick={() => reload()} variant="secondary" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Response
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

