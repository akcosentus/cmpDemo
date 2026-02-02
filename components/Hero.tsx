'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ChartRenderer from './ChartRenderer'

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
  const [panelWidth, setPanelWidth] = useState(500)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const minWidth = 350
  const maxWidth = 1200

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
      e.preventDefault()
      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isDragging) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
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

  const parseCharts = (content: string) => {
    const chartRegex = /```chart-(\w+)\n([\s\S]*?)```/g
    const parts: Array<{ type: 'text' | 'chart', content: string, chartType?: string, chartData?: any }> = []
    let lastIndex = 0
    let match

    while ((match = chartRegex.exec(content)) !== null) {
      // Add text before chart
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        })
      }

      // Add chart
      try {
        const chartType = match[1]
        const chartData = JSON.parse(match[2])
        parts.push({
          type: 'chart',
          content: '',
          chartType,
          chartData
        })
      } catch (e) {
        // If JSON parse fails, treat as text
        parts.push({
          type: 'text',
          content: match[0]
        })
      }

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      })
    }

    return parts.length > 0 ? parts : [{ type: 'text' as const, content }]
  }

  return (
    <div className="pt-[70px] min-h-screen bg-[#f5f5f5] relative">
      {/* Main Content - Shifts when panel is open */}
      <div 
        className={isDragging ? '' : 'transition-all duration-300 ease-in-out'}
        style={{ 
          marginRight: isAIChatOpen ? `${panelWidth}px` : '0px'
        }}
      >
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Header */}
          <h2 className="text-center text-[32px] font-medium text-[#333] mb-8">
            Welcome to ClaimsManager Provider Portal!
          </h2>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-300">
              {['Dashboard 1', 'Dashboard 2', 'Dashboard 3', 'Dashboard 4'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === index
                      ? 'bg-[#01B2D6] text-white border-b-2 border-[#01B2D6]'
                      : 'text-gray-600 hover:text-[#01B2D6] hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Screenshot Display */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex justify-center">
            <img
              src={`/dashboard-${activeTab + 1}.png`}
              alt={`Dashboard ${activeTab + 1}`}
              className="w-full h-auto max-w-4xl object-contain"
              style={{ maxHeight: '70vh' }}
            />
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
          className={`fixed top-[70px] right-0 h-[calc(100vh-70px)] bg-white shadow-2xl flex z-40 ${isDragging ? '' : 'transition-all duration-300 ease-in-out'}`}
          style={{ width: `${panelWidth}px` }}
        >
          {/* Resize Handle */}
          <div
            className="w-1 bg-gray-200 hover:bg-[#01B2D6] cursor-col-resize transition-colors flex-shrink-0"
            onMouseDown={() => setIsDragging(true)}
          />
          
          {/* Panel Content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] min-w-0 rounded-2xl px-4 py-2 overflow-hidden ${
                        msg.role === 'user'
                          ? 'bg-black bg-opacity-70 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                    {msg.role === 'assistant' ? (
                      <div className="text-[15px]">
                        {parseCharts(msg.content).map((part, partIndex) => (
                          part.type === 'chart' ? (
                            <ChartRenderer
                              key={partIndex}
                              type={part.chartType as any}
                              data={part.chartData.data}
                              config={part.chartData.config}
                            />
                          ) : (
                            <div key={partIndex} className="prose prose-sm max-w-none break-words overflow-wrap-anywhere prose-headings:mt-4 prose-headings:mb-3 prose-headings:font-semibold prose-p:my-3 prose-p:break-words prose-p:leading-relaxed prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-[#01B2D6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:py-2 prose-strong:font-semibold prose-code:bg-gray-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:break-words prose-pre:bg-gray-800 prose-pre:text-white prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto prose-pre:my-4">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {part.content}
                              </ReactMarkdown>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <p className="text-[15px] break-words">{msg.content}</p>
                    )}
                    </div>
                  </div>
                  
                  {/* Show suggested questions only after the first assistant message */}
                  {index === 0 && msg.role === 'assistant' && messages.length === 1 && (
                    <div className="mt-3 space-y-2 flex flex-col items-end w-full">
                      {suggestedQuestions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleQuestionClick(question)}
                          disabled={isLoading}
                          className="text-left px-4 py-2 bg-black bg-opacity-70 hover:bg-opacity-80 text-white rounded-full transition-all text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
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
