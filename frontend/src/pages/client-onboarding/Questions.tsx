import { useState } from 'react'
import ChatBot from '../../components/chat/ChatBot'
import Button from '../../components/common/Button'
import LargeCheckbox from '../../components/form/LargeCheckbox'

interface QuestionsProps {
  navigate: (path: string) => void
}

export interface InvestmentGoal {
  id: string;
  label: string;
  selected: boolean;
}

export default function Questions({ navigate: _navigate }: QuestionsProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [investmentGoals, setInvestmentGoals] = useState<InvestmentGoal[]>([
    { id: 'growth', label: 'Growth', selected: true },
    { id: 'tax-efficiency', label: 'Tax efficiency', selected: true },
    { id: 'protection', label: 'Protection', selected: false },
    { id: 'income', label: 'Income', selected: false },
    { id: 'financial-independence', label: 'Financial Independence', selected: true }
  ])


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const toggleGoal = (goalId: string) => {
    setInvestmentGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, selected: !goal.selected }
          : goal
      )
    )
  }

  const handleContinue = () => {
    const selectedGoals = investmentGoals.filter(goal => goal.selected)
    console.log('Selected investment goals:', selectedGoals)
    // TODO: Navigate to next step with selected goals
    // navigate('/next-step')
  }

  const handleSkip = () => {
    // TODO: Navigate to next step without goals
    // navigate('/next-step')
  }

  return (
    <div className='h-screen p-[2%] hero-pattern flex'>
      {/* Left Section - Questions Form */}
      <section className={`flex flex-col justify-center items-center transition-all duration-300 ${
        isChatOpen ? 'flex-1' : 'w-full'
      }`}>
        <div className='w-full max-w-2xl text-center'>
          <h1 className="text-2xl font-bold text-text-primary mb-8 text-left">
            What type of investor is your client?
          </h1>

          {/* Investment Goals Checkboxes */}
          <div className='mb-8'>
            <div className='flex flex-wrap gap-4'>
              {investmentGoals.map((goal) => (
                <LargeCheckbox 
                  key={goal.id}
                  goal={goal}
                  toggleGoal={toggleGoal}
                />
              ))}
            </div>
          </div>


          {/* selectors */}
          <div className='mb-8'>
            <div className='flex flex-wrap gap-4'>
              {investmentGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-3 py-8 px-16 rounded-xl border transition-all duration-200 ${
                    goal.selected
                      ? 'border-white bg-bg-input'
                      : 'border-border bg-bg-input hover:border-white/50'
                  }`}
                >
                  {/* Checkbox */}

                  
                  {/* Label */}
                  <span className='text-text-primary font-medium text-left'>
                    {goal.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          

          {/* Action Buttons */}
          <div className='flex justify-between gap-4'>
            <Button 
              onClick={handleSkip}
              variant='secondary'
              className='flex-1'
            >
              Skip
            </Button>
            <Button 
              onClick={handleContinue}
              variant='primary'
              className='flex-1'
            >
              Next
            </Button>
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