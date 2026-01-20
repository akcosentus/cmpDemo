'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ChatBot />
    </main>
  )
}
