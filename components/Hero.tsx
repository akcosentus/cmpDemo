'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  const [panelWidth, setPanelWidth] = useState(450)
  const [isDragging, setIsDragging] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const minWidth = 300
  const maxWidth = 700

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

  // Handle panel resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, minWidth, maxWidth])

  const suggestedQuestions = [
    "Compare my profitability across surgery centers",
    "Analyze my worst-performing payers",
    "Show me my top documentation issues",
    "Analyze my denial trends over time"
  ]

  const initializeChat = async () => {
    try {
      console.log('Initializing chat...')
      const response = await fetch('/api/retell/create-chat', {
        method: 'POST'
      })
      const data = await response.json()
      console.log('Create chat response:', data)
      
      if (data.error) {
        console.error('Chat initialization error:', data.error)
        setMessages([{
          role: 'assistant',
          content: `Error: ${data.error}`
        }])
        return
      }
      
      if (data.chatId) {
        setChatId(data.chatId)
        setMessages([{
          role: 'assistant',
          content: 'Hello! How can I help you today?'
        }])
        console.log('Chat initialized with ID:', data.chatId)
      }
    } catch (error) {
      console.error('Error initializing chat:', error)
      setMessages([{
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again.'
      }])
    }
  }

  const handleQuestionClick = async (question: string) => {
    if (!chatId || isLoading) return
    
    setIsLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: question }])

    try {
      console.log('Sending message:', question, 'with chat_id:', chatId)
      const response = await fetch('/api/retell/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: chatId,
          message: question
        })
      })

      const data = await response.json()
      console.log('Send message response:', data)
      
      if (data.error) {
        console.error('Send message error:', data.error)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`
        }])
        return
      }
      
      if (data.content) {
        // Add assistant's response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }])
        console.log('Added assistant message:', data.content)
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

  const handleSend = async () => {
    if (!message.trim() || !chatId || isLoading) {
      console.log('Send blocked:', { hasMessage: !!message.trim(), hasChatId: !!chatId, isLoading })
      return
    }

    const userMessage = message.trim()
    setMessage('')
    setIsLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      console.log('Sending message:', userMessage, 'with chat_id:', chatId)
      const response = await fetch('/api/retell/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: chatId,
          message: userMessage
        })
      })

      const data = await response.json()
      console.log('Send message response:', data)
      
      if (data.error) {
        console.error('Send message error:', data.error)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`
        }])
        return
      }
      
      if (data.content) {
        // Add assistant's response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }])
        console.log('Added assistant message:', data.content)
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="pt-[70px] min-h-screen bg-[#f5f5f5] relative">
      {/* Main Content - Shifts when panel is open */}
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{ 
          marginRight: isAIChatOpen ? `${panelWidth}px` : '0px'
        }}
      >
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Header */}
          <h2 className="text-center text-[32px] font-medium text-[#333] mb-8">
            Welcome to ClaimsManager Provider Portal!
          </h2>

          {/* Add Widget Button */}
          <div className="text-right mb-4">
            <button className="px-4 py-2 bg-[#d4f1d4] text-gray-700 rounded hover:bg-[#c8ecc8] transition-colors text-sm flex items-center ml-auto">
              Add Widget... <span className="ml-1">›</span>
            </button>
          </div>

          {/* Dashboard Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {/* Widget 1: Billed and Collected by Week */}
            <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
              <div className="bg-[#c5e9f2] border-b border-[#bbb] px-3 py-2 flex justify-between items-center">
                <h3 className="text-[13px] font-semibold text-[#333]">Billed and Collected by Week</h3>
                <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
              </div>
              <div className="p-3 flex-1 flex items-center justify-center min-h-0">
                <div className="w-full h-full flex flex-col">
                  <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                    <line x1="35" y1="180" x2="310" y2="180" stroke="#ddd" strokeWidth="1" />
                    <line x1="35" y1="135" x2="310" y2="135" stroke="#ddd" strokeWidth="1" />
                    <line x1="35" y1="90" x2="310" y2="90" stroke="#ddd" strokeWidth="1" />
                    <line x1="35" y1="45" x2="310" y2="45" stroke="#ddd" strokeWidth="1" />
                    <text x="5" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                    <text x="5" y="140" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">200k</text>
                    <text x="5" y="95" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">400k</text>
                    <text x="5" y="50" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">500k</text>
                    <polygon points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175 285,180 45,180" fill="#e8b4d9" opacity="0.5" />
                    <polyline points="45,50 75,35 105,40 135,60 165,85 195,80 225,105 255,155 285,175" fill="none" stroke="#c9479d" strokeWidth="3" strokeLinejoin="miter" />
                    <circle cx="45" cy="50" r="4" fill="#c9479d" />
                    <circle cx="75" cy="35" r="4" fill="#c9479d" />
                    <circle cx="105" cy="40" r="4" fill="#c9479d" />
                    <circle cx="135" cy="60" r="4" fill="#c9479d" />
                    <circle cx="165" cy="85" r="4" fill="#c9479d" />
                    <circle cx="195" cy="80" r="4" fill="#c9479d" />
                    <circle cx="225" cy="105" r="4" fill="#c9479d" />
                    <circle cx="255" cy="155" r="4" fill="#c9479d" />
                    <circle cx="285" cy="175" r="4" fill="#c9479d" />
                    <line x1="45" y1="180" x2="285" y2="180" stroke="#5cb85c" strokeWidth="3" />
                    <text x="45" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 45 200)">10/26/2025</text>
                    <text x="75" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 75 200)">11/02/2025</text>
                    <text x="105" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 105 200)">11/09/2025</text>
                    <text x="135" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 135 200)">11/16/2025</text>
                    <text x="165" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 165 200)">11/23/2025</text>
                    <text x="195" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 195 200)">11/30/2025</text>
                    <text x="225" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 225 200)">12/07/2025</text>
                    <text x="255" y="200" fontSize="9" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif" transform="rotate(45 255 200)">12/14/2025</text>
                  </svg>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <div className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 bg-[#5cb85c] mr-1"></span>
                      <span className="text-[10px] text-gray-700">Billed Amount</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 bg-[#e91e8c] mr-1"></span>
                      <span className="text-[10px] text-gray-700">Collected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Billed and Collected by Month */}
            <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
              <div className="bg-[#c5e9f2] border-b border-[#bbb] px-3 py-2 flex justify-between items-center">
                <h3 className="text-[13px] font-semibold text-[#333]">Billed and Collected by Month</h3>
                <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
              </div>
              <div className="p-3 flex-1 flex items-center justify-center min-h-0">
                <div className="w-full h-full flex flex-col">
                  <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                    <line x1="40" y1="180" x2="300" y2="180" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="135" x2="300" y2="135" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="90" x2="300" y2="90" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="45" x2="300" y2="45" stroke="#ddd" strokeWidth="1" />
                    <text x="5" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                    <text x="5" y="140" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">750k</text>
                    <text x="5" y="95" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">1.5M</text>
                    <text x="5" y="50" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">2.25M</text>
                    <polygon points="70,110 130,95 190,105 250,120 250,180 70,180" fill="#e8b4d9" opacity="0.5" />
                    <polyline points="70,110 130,95 190,105 250,120" fill="none" stroke="#c9479d" strokeWidth="3" strokeLinejoin="miter" />
                    <circle cx="70" cy="110" r="4" fill="#c9479d" />
                    <circle cx="130" cy="95" r="4" fill="#c9479d" />
                    <circle cx="190" cy="105" r="4" fill="#c9479d" />
                    <circle cx="250" cy="120" r="4" fill="#c9479d" />
                    <line x1="70" y1="180" x2="250" y2="180" stroke="#5cb85c" strokeWidth="3" />
                    <text x="70" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">October</text>
                    <text x="130" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">November</text>
                    <text x="190" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">December</text>
                    <text x="250" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">January</text>
                  </svg>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <div className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 bg-[#5cb85c] mr-1"></span>
                      <span className="text-[10px] text-gray-700">Billed Amount</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 bg-[#e91e8c] mr-1"></span>
                      <span className="text-[10px] text-gray-700">Collected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 3: Denials by Month */}
            <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
              <div className="bg-[#c5e9f2] border-b border-[#bbb] px-3 py-2 flex justify-between items-center">
                <h3 className="text-[13px] font-semibold text-[#333]">Denials by Month</h3>
                <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
              </div>
              <div className="p-3 flex-1 flex items-center justify-center min-h-0">
                <div className="w-full h-full flex flex-col">
                  <svg className="w-full flex-1" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{shapeRendering: 'crispEdges'}}>
                    <line x1="40" y1="180" x2="300" y2="180" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="135" x2="300" y2="135" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="90" x2="300" y2="90" stroke="#ddd" strokeWidth="1" />
                    <line x1="40" y1="45" x2="300" y2="45" stroke="#ddd" strokeWidth="1" />
                    <text x="5" y="185" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">0</text>
                    <text x="5" y="140" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">30</text>
                    <text x="5" y="95" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">60</text>
                    <text x="5" y="50" fontSize="11" fill="#333" fontFamily="Arial, sans-serif">90</text>
                    <rect x="55" y="145" width="30" height="35" fill="#5cb85c" />
                    <rect x="115" y="130" width="30" height="50" fill="#5cb85c" />
                    <rect x="175" y="155" width="30" height="25" fill="#5cb85c" />
                    <rect x="235" y="140" width="30" height="40" fill="#5cb85c" />
                    <text x="70" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">Oct</text>
                    <text x="130" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">Nov</text>
                    <text x="190" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">Dec</text>
                    <text x="250" y="200" fontSize="11" textAnchor="middle" fill="#333" fontFamily="Arial, sans-serif">Jan</text>
                  </svg>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <div className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 bg-[#5cb85c] mr-1"></span>
                      <span className="text-[10px] text-gray-700">Denials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 4: Denied Claims By Payer */}
            <div className="bg-white rounded-sm border border-[#ddd] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
              <div className="bg-[#c5e9f2] border-b border-[#bbb] px-3 py-2 flex justify-between items-center">
                <h3 className="text-[13px] font-semibold text-[#333]">Denied Claims By Payer</h3>
                <button className="text-[#999] hover:text-[#666] text-xl leading-none font-light">×</button>
              </div>
              <div className="p-3 flex-1 flex items-center justify-center min-h-0">
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="40" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#5cb85c" strokeWidth="40" strokeDasharray="251.2 251.2" strokeDashoffset="62.8" transform="rotate(-90 100 100)" />
                  </svg>
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

      {/* AI Chat Side Panel */}
      {isAIChatOpen && (
        <div 
          className="fixed top-[70px] right-0 h-[calc(100vh-70px)] bg-white shadow-2xl flex transition-all duration-300 ease-in-out z-40"
          style={{ width: `${panelWidth}px` }}
        >
          {/* Resize Handle */}
          <div
            className="w-1 bg-gray-200 hover:bg-[#01B2D6] cursor-col-resize transition-colors flex-shrink-0"
            onMouseDown={() => setIsDragging(true)}
          />
          
          {/* Panel Content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-[#333]">AI Assistant</h3>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-black bg-opacity-70 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="text-[15px] prose prose-sm max-w-none prose-headings:mt-3 prose-headings:mb-2 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-blockquote:my-2 prose-blockquote:border-l-4 prose-blockquote:border-[#01B2D6] prose-blockquote:pl-3 prose-blockquote:italic prose-table:text-sm prose-th:bg-gray-200 prose-th:p-2 prose-td:p-2 prose-td:border prose-th:border prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-800 prose-pre:text-white prose-pre:p-3 prose-pre:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-[15px]">{msg.content}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Show suggested questions only after the first assistant message */}
                  {index === 0 && msg.role === 'assistant' && messages.length === 1 && (
                    <div className="mt-4 space-y-2">
                      {suggestedQuestions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleQuestionClick(question)}
                          disabled={isLoading}
                          className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
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

            {/* Search Bar at Bottom */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
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
        </div>
      )}
    </div>
  )
}
