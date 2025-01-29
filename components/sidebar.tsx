"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlusIcon, Settings, LogOut } from "lucide-react"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  conversations: { id: string; title: string }[]
  onNewChat: () => void
  onSelectConversation: (id: string) => void
}

export function Sidebar({ className, conversations, onNewChat, onSelectConversation, ...props }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-muted text-muted-foreground transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={cn("text-xl font-bold", isCollapsed && "hidden")}>Switchboard</h1>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
      <Button className="m-2" onClick={onNewChat}>
        <PlusIcon className="mr-2 h-4 w-4" />
        {!isCollapsed && "New Chat"}
      </Button>
      <nav className="flex-1 overflow-y-auto px-2">
        {conversations.map((conv) => (
          <Button
            key={conv.id}
            variant="ghost"
            className="w-full justify-start truncate px-2 py-1 text-left mb-1"
            onClick={() => onSelectConversation(conv.id)}
          >
            {!isCollapsed && conv.title}
          </Button>
        ))}
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          {!isCollapsed && "Settings"}
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}

