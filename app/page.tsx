"use client"

import { ChatForm } from "@/components/chat-form"
import { Sidebar } from "@/components/sidebar"
import { useState, useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

export default function Page() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [conversations, setConversations] = useState([
    { id: "1", title: "Chat 1" },
    { id: "2", title: "Chat 2" },
  ])

  const handleNewChat = () => {
    const newId = String(conversations.length + 1)
    setConversations([...conversations, { id: newId, title: `Chat ${newId}` }])
  }

  const handleSelectConversation = (id: string) => {
    console.log(`Selected conversation: ${id}`)
    // Here you would typically load the selected conversation
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />
      <ChatForm className="flex-1" />
    </div>
  )
}

