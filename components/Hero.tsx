'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface HeroProps {
  isAIChatOpen: boolean
}

export default function Hero({ isAIChatOpen }: HeroProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize chat session when chat opens
  useEffect(() => {
    if (isAIChatOpen && !chatId) {
      initializeChat()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAIChatOpen, chatId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const initializeChat = async () => {
    try {
      const response = await fetch('/api/retell/create-chat', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.chat_id) {
        setChatId(data.chat_id)
        setMessages([{
          role: 'assistant',
          content: 'Hello! How can I help you today?'
        }])
      }
    } catch (error) {
      console.error('Error initializing chat:', error)
      setMessages([{
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again.'
      }])
    }
  }

  const handleSend = async () => {
    if (!message.trim() || !chatId || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    setIsLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/retell/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          content: userMessage
        })
      })

      const data = await response.json()
      
      if (data.messages && data.messages.length > 0) {
        // Add assistant's response(s)
        const assistantMessages = data.messages
          .filter((msg: any) => msg.role === 'assistant')
          .map((msg: any) => ({
            role: 'assistant' as const,
            content: msg.content
          }))
        
        setMessages(prev => [...prev, ...assistantMessages])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-[70px] min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <h2 className="text-center text-[32px] font-medium text-[#333] mb-8">
          Welcome to ClaimsManager Provider Portal!
        </h2>

        {/* AI Chat Window */}
        {isAIChatOpen && (
          <div className="mx-auto mb-8 bg-white rounded-lg shadow-sm border border-gray-200" style={{ width: '50vw', height: '55vh' }}>
            <div className="h-full flex flex-col p-4">
              {/* Chat messages area */}
              <div className="flex-1 overflow-y-auto mb-3 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-[#01B2D6] text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-[15px]">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Search bar at bottom */}
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={isLoading || !chatId}
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 text-[15px] pr-14 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !chatId || !message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#01B2D6] rounded-full flex items-center justify-center hover:bg-[#019bb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Widget Button */}
        <div className="text-right mb-4">
          <button className="px-4 py-2 bg-[#d4f1d4] text-gray-700 rounded hover:bg-[#c8ecc8] transition-colors text-sm flex items-center ml-auto">
            Add Widget... <span className="ml-1">›</span>
          </button>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Widget 1: Billed and Collected by Week */}
          <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="bg-[#c5e9f2] border-b border-[#bbb] px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Billed and Collected by Week</h3>
              <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                  {/* Grid lines - more visible */}
                  <line x1="35" y1="180" x2="310" y2="180" stroke="#ddd" strokeWidth="1" />
                  <line x1="35" y1="135" x2="310" y2="135" stroke="#ddd" strokeWidth="1" />
                  <line x1="35" y1="90" x2="310" y2="90" stroke="#ddd" strokeWidth="1" />
                  <line x1="35" y1="45" x2="310" y2="45" stroke="#ddd" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="5" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                  <text x="5" y="140" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">200k</text>
                  <text x="5" y="95" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">400k</text>
                  <text x="5" y="50" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">500k</text>
                  
                  {/* Pink fill area - less opacity */}
                  <polygon
                    points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175 285,180 45,180"
                    fill="#e8b4d9"
                    opacity="0.5"
                  />
                  
                  {/* Pink line (Collected) - thicker, less smooth */}
                  <polyline
                    points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175"
                    fill="none"
                    stroke="#c9479d"
                    strokeWidth="3"
                    strokeLinejoin="miter"
                  />
                  
                  {/* Data points - larger */}
                  <circle cx="45" cy="50" r="4" fill="#c9479d" />
                  <circle cx="75" cy="35" r="4" fill="#c9479d" />
                  <circle cx="105" cy="40" r="4" fill="#c9479d" />
                  <circle cx="135" cy="60" r="4" fill="#c9479d" />
                  <circle cx="165" cy="85" r="4" fill="#c9479d" />
                  <circle cx="195" cy="80" r="4" fill="#c9479d" />
                  <circle cx="225" cy="105" r="4" fill="#c9479d" />
                  <circle cx="255" cy="155" r="4" fill="#c9479d" />
                  <circle cx="285" cy="175" r="4" fill="#c9479d" />
                  
                  {/* Green line (Billed - flat at 0) */}
                  <line x1="45" y1="180" x2="285" y2="180" stroke="#5cb85c" strokeWidth="3" />
                  
                  {/* Week labels */}
                  <text x="45" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 45 200)">10/26/2025</text>
                  <text x="75" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 75 200)">11/02/2025</text>
                  <text x="105" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 105 200)">11/09/2025</text>
                  <text x="135" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 135 200)">11/16/2025</text>
                  <text x="165" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 165 200)">11/23/2025</text>
                  <text x="195" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 195 200)">11/30/2025</text>
                  <text x="225" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 225 200)">12/07/2025</text>
                  <text x="255" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 255 200)">12/14/2025</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#e91e8c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Billed and Collected by Month */}
          <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="bg-[#c5e9f2] border-b border-[#bbb] px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Billed and Collected by Month</h3>
              <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                  {/* Grid lines */}
                  <line x1="40" y1="180" x2="300" y2="180" stroke="#ddd" strokeWidth="1" />
                  <line x1="40" y1="135" x2="300" y2="135" stroke="#ddd" strokeWidth="1" />
                  <line x1="40" y1="90" x2="300" y2="90" stroke="#ddd" strokeWidth="1" />
                  <line x1="40" y1="45" x2="300" y2="45" stroke="#ddd" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="5" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                  <text x="5" y="140" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">750k</text>
                  <text x="5" y="95" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">1.5M</text>
                  <text x="5" y="50" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">2M</text>
                  
                  {/* Pink fill area */}
                  <polygon
                    points="60,60 105,55 150,65 195,50 240,60 285,95 285,180 60,180"
                    fill="#e8b4d9"
                    opacity="0.5"
                  />
                  
                  {/* Pink line (Collected) */}
                  <polyline
                    points="60,60 105,55 150,65 195,50 240,60 285,95"
                    fill="none"
                    stroke="#c9479d"
                    strokeWidth="3"
                    strokeLinejoin="miter"
                  />
                  
                  {/* Data points */}
                  <circle cx="60" cy="60" r="4" fill="#c9479d" />
                  <circle cx="105" cy="55" r="4" fill="#c9479d" />
                  <circle cx="150" cy="65" r="4" fill="#c9479d" />
                  <circle cx="195" cy="50" r="4" fill="#c9479d" />
                  <circle cx="240" cy="60" r="4" fill="#c9479d" />
                  <circle cx="285" cy="95" r="4" fill="#c9479d" />
                  
                  {/* Green line (Billed - flat at 0) */}
                  <line x1="60" y1="180" x2="285" y2="180" stroke="#5cb85c" strokeWidth="3" />
                  
                  {/* Month labels */}
                  <text x="60" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">July</text>
                  <text x="105" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">August</text>
                  <text x="150" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">September</text>
                  <text x="195" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">October</text>
                  <text x="240" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">November</text>
                  <text x="285" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">December</text>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#e91e8c] mr-1.5"></span>
                    <span className="text-[11px] text-gray-700">Billed Amount Collected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Denials by Month */}
          <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="bg-[#c5e9f2] border-b border-[#bbb] px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Denials by Month</h3>
              <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                  {/* Grid lines */}
                  <line x1="40" y1="180" x2="300" y2="180" stroke="#ddd" strokeWidth="1" />
                  <line x1="40" y1="120" x2="300" y2="120" stroke="#ddd" strokeWidth="1" />
                  <line x1="40" y1="60" x2="300" y2="60" stroke="#ddd" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="20" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                  <text x="20" y="125" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">1</text>
                  <text x="20" y="65" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">2</text>
                  
                  {/* Green fill area */}
                  <polygon
                    points="60,120 105,120 150,180 195,30 240,120 285,180 285,180 60,180"
                    fill="#c8e6c9"
                    opacity="0.5"
                  />
                  
                  {/* Green line */}
                  <polyline
                    points="60,120 105,120 150,180 195,30 240,120 285,180"
                    fill="none"
                    stroke="#5cb85c"
                    strokeWidth="3"
                    strokeLinejoin="miter"
                  />
                  
                  {/* Data points */}
                  <circle cx="60" cy="120" r="4" fill="#5cb85c" />
                  <circle cx="105" cy="120" r="4" fill="#5cb85c" />
                  <circle cx="150" cy="180" r="4" fill="#5cb85c" />
                  <circle cx="195" cy="30" r="4" fill="#5cb85c" />
                  <circle cx="240" cy="120" r="4" fill="#5cb85c" />
                  <circle cx="285" cy="180" r="4" fill="#5cb85c" />
                  
                  {/* Month labels */}
                  <text x="60" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">August</text>
                  <text x="105" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">September</text>
                  <text x="150" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">October</text>
                  <text x="195" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">November</text>
                  <text x="240" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">December</text>
                  <text x="285" y="200" fontSize="10" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">January</text>
                </svg>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-block w-3 h-3 bg-[#5cb85c] mr-1.5"></span>
                  <span className="text-[11px] text-gray-700">Denials Received</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 4: Denied Claims By Payer */}
          <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="bg-[#c5e9f2] border-b border-[#bbb] px-4 py-3 flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-[#333]">Denied Claims By Payer</h3>
              <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
            </div>
            <div className="p-4 h-[400px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <svg className="w-64 h-64" viewBox="0 0 200 200">
                  {/* Full pie chart circle */}
                  <circle cx="100" cy="100" r="80" fill="#5cb85c" />
                  {/* Small white line for visual detail */}
                  <line x1="100" y1="20" x2="100" y2="100" stroke="white" strokeWidth="2" />
                </svg>
                <div className="flex items-center justify-center mt-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#5cb85c] mr-2"></span>
                  <span className="text-[11px] text-gray-700">NOVITAS SOLUTIONS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <hr className="my-10 border-gray-300" />
        <footer className="pb-6 text-center">
          <p className="text-[#666] text-[13px]">© 2026 - SyMed Corporation</p>
        </footer>
      </div>
    </div>
  )
}
