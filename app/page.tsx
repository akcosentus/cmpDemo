'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Navbar onAskAIClick={() => setIsAIChatOpen(!isAIChatOpen)} />
      <Hero isAIChatOpen={isAIChatOpen} />
      <ChatBot />
    </main>
  )
}
