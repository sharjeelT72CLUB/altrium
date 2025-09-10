
import { useState } from 'react'
import LetterAvatar from '../../components/common/LetterAvatar'
import ChatBot from '../../components/chat/ChatBot'

interface AddClientProps {
  navigate: (path: string) => void
}

export default function AddClient({ navigate }: AddClientProps) {
  const [clientName, setClientName] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value)
  }

  const handleContinue = () => {
    if (clientName.trim()) {
      // TODO: Save client name and proceed to next step
      console.log('Client name:', clientName)
      navigate('/client-onboarding/questions')
      // navigate('/next-step')
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className='h-screen p-[2%] hero-pattern flex'>
      {/* Left Section - Client Form */}
      <section className={`flex flex-col justify-center items-center transition ${
        isChatOpen ? 'flex-1' : 'w-full'
      }`}>
        <div className='w-full max-w-md text-center'>
          <h1 className="text-2xl font-bold text-text-primary mb-8 text-left">
            Before we begin, I'd like to learn a bit about your client so I can tailor my recommendations.
          </h1>

          <div className="bg-bg-input p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4">
              {/* Avatar - shows when name is entered */}
              {clientName.trim() && (
                <LetterAvatar 
                  name={clientName} 
                  size="lg" 
                  showBorder={true}
                  className="flex-shrink-0"
                />
              )}
              
              {/* Input field */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={handleNameChange}
                  className="bg-transparent p-4 rounded-lg text-text-primary placeholder-[#7A7A7A] text-base w-full border border-transparent focus:border-primary focus:outline-none transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Continue button - appears when name is entered */}
            {clientName.trim() && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleContinue}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-input"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Right Section - ChatBot */}
      <section className={`flex justify-end items-center transition-all duration-300 ${
        isChatOpen ? 'w-96' : 'w-16'
      }`}>
        <ChatBot 
          isOpen={isChatOpen} 
          onToggle={toggleChat}
          className="h-full"
        />
      </section>
    </div>
  )
}
