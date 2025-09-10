import React from 'react'
import Button from '../components/common/Button'

interface LandingProps {
  navigate: (path: string) => void
}

export default function Landing({ navigate }: LandingProps) {
  return (
    <div className='flex flex-col h-screen justify-center px-[25%] hero-pattern'>
      <h1 className='text-4xl font-bold text-text-primary mb-4'>
        Hey there, I’m Altrium.
      </h1>
      <p className='text-lg text-text-muted'>
        Think of me as your AI copilot for exploring investments. I make it easier
        to discover new funds, compare them side by side, and quickly summarize the
        details so you can focus on advising your clients.
      </p>

      <p className='text-lg text-text-muted my-4'>Here’s how I can help:</p>

      <div className='my-3'>
        <p className='text-lg text-text-primary'>Discover</p>
        <p className='text-lg text-text-muted my-2'>
          Looking for options? I’ll surface funds across categories and strategies.
        </p>
      </div>

      <div className='my-3'>
        <p className='text-lg text-text-primary'>Compare</p>
        <p className='text-lg text-text-muted my-2'>
          Need clarity? I’ll line them up with performance, risk, and fees.
        </p>
      </div>

      <div className='my-3'>
        <p className='text-lg text-text-primary'>Summarize</p>
        <p className='text-lg text-text-muted my-2'>
          Short on time? I’ll break things down into clear, shareable overviews.
        </p>
      </div>

      <div className="mt-6 flex">
        <Button className='p-6' onClick={() => navigate('/client-onboarding/add-client')}>I Understand</Button>
      </div>
    </div>
  )
}
