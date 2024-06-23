"use client"

import { useCurrentUser } from "@/hooks/use-current-user"

import ChatNavbar from "./_components/chat-navbar"

const ChatPage = () => {
  const userData = useCurrentUser()
  return (
    <div className="flex min-h-screen flex-col">
      <ChatNavbar />
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}

export default ChatPage
