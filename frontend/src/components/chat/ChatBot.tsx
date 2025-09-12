import { useState, useEffect } from 'react'
import Ai from '../../assets/icons/Ai.svg'


interface Message {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  message_type: 'user' | 'assistant';
}

interface ChatBotProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  userId?: string;
}

export default function ChatBot({ className = '', isOpen, onToggle, userId }: ChatBotProps) {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const suggestedPrompts = [
    "Would you like me to explain the difference between Qualified, Accredited, and Institutional investors?",
    "Do you want to see examples of typical investor profiles under each type?",
    "Not sure which category fits your client? I can help you decide."
  ]
  console.log(messages)
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/chat/')
    setWs(socket)
  
    socket.onmessage = (event) => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), message: '', response: event.data, timestamp: new Date().toISOString(), message_type: 'assistant' }
      ])
    }
  
    return () => socket.close()
  }, [])
  

  const handleSendMessage = async () => {
    if (ws) {
      setMessages([...messages, { id: Date.now().toString(), message: inputValue, response: '', timestamp: new Date().toISOString(), message_type: 'user' }])
      ws.send(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`relative ${className}`}>
      {/* Chat Window */}
      {isOpen ? (
        <div className='bg-bg-light h-full w-full flex flex-col'>
          {/* Header with Logo and Close Button */}
          <div className='flex flex-col items-center pt-8 pb-6 relative'>
            {/* Close Button */}
            <button
              onClick={onToggle}
              className='absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors p-1'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl font-bold text-bg-light'>A</span>
            </div>
            <h2 className='text-text-primary font-bold text-lg'>How may I help you?</h2>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto px-6 pb-6'>
            {messages.length === 0 ? (
              <div className='space-y-4'>
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className='w-full text-left p-4 bg-bg-input rounded-lg border border-border hover:border-primary transition-colors duration-200 group'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-text-primary rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors duration-200'></div>
                      <p className='text-text-primary text-sm leading-relaxed'>{prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className='space-y-4'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.message_type === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-bg-input text-text-primary rounded-bl-md'
                      }`}
                    >
                      {message.message_type === 'user' ? (
                        <p className='text-sm leading-relaxed'>{message.message}</p>
                      ) : (
                        <p className='text-sm leading-relaxed'>{message.response}</p>
                      )}
                      <p className={`text-xs mt-1 ${
                        message.message_type === 'user' ? 'text-blue-100' : 'text-text-muted'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-bg-input text-text-primary rounded-2xl rounded-bl-md p-3'>
                      <div className='flex space-x-1'>
                        <div className='w-2 h-2 bg-text-muted rounded-full animate-bounce'></div>
                        <div className='w-2 h-2 bg-text-muted rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                        <div className='w-2 h-2 bg-text-muted rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className='p-6 border-t border-border'>
            <div className='flex items-center gap-3 bg-bg-input rounded-lg p-3'>
              <div className='w-6 h-6 bg-text-muted rounded-full flex items-center justify-center flex-shrink-0'>
                <svg className='w-3 h-3 text-bg-input' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
              </div>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Ask me anything...'
                className='flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none'
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className='bg-primary text-white p-2 rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Toggle Button */
        <button
          onClick={onToggle}
          className='bg-bg-secondary rounded-3xl p-6 h-full w-16 flex flex-col items-center justify-center hover:bg-primary transition-colors duration-200 group'
        >
          <img src={Ai} alt="AI" className='w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
          <span className='text-text-primary text-xs mt-2 font-medium writing-mode-vertical-rl'>
            Chat
          </span>
        </button>
      )}
    </div>
  )
}
