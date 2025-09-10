import { useState } from 'react'
import Logo from '../../assets/logo.svg'
import TextInput from '../../components/form/TextInput'
import Button from '../../components/common/Button'
import Google from '../../assets/GoogleLogo.svg'
import Apple from '../../assets/AppleLogo.svg'

interface LogInProps {
  navigate: (path: string) => void
}

export default function LogIn({ navigate }: LogInProps) {
  const [email, setEmail] = useState('')
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked')
  }

  const handleAppleLogin = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple login clicked')
  }

  const handleEmailLogin = () => {
    // TODO: Implement email login
    console.log('Email login:', email)
    navigate('/landing')
  }

  return (
    <div className='grid grid-cols-2 h-screen w-screen right-hero'>
      {/* Left Section - Login Form */}
      <section className='flex flex-col items-center justify-center relative left-hero'>
        <div className='w-[50%] max-w-md flex flex-col gap-6 z-10'>
          {/* Logo */}
          <div className='flex justify-center mb-8'>
            <img src={Logo} alt="Altrium Logo" className='h-8' />
          </div>

          {/* Social Login Buttons */}
          <div className='space-y-3'>
            <Button 
              onClick={handleGoogleLogin}
              variant="secondary"
              className="flex items-center justify-start gap-3 text-left w-full"
            >
              <img src={Google} alt="Google" className='w-5 h-5' />
              Continue with Google
            </Button>
            
            <Button 
              onClick={handleAppleLogin}
              variant="secondary"
              className="flex items-center justify-start gap-3 text-left w-full"
            >
              <img src={Apple} alt="Apple" className='w-5 h-5' />
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className='relative flex items-center justify-center my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-600'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-bg text-text-secondary'>or</span>
            </div>
          </div>

          {/* Email Input */}
          <TextInput 
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Continue Button */}
          <Button onClick={handleEmailLogin}>
            Continue
          </Button>
        </div>
      </section>

      {/* Right Section - Welcome Message */}
      <section className='flex flex-col items-center justify-center bg-bg-light m-8 rounded-3xl z-1'>
        <div className='text-center max-w-md px-8'>
          <h1 className='text-4xl font-bold text-text-primary mb-4 font-heading'>
            Welcome to Altrium
          </h1>
          <p className='text-text-secondary text-lg leading-relaxed'>
            Your gateway to intelligent financial insights and portfolio management.
          </p>
        </div>
      </section>
    </div>
  )
}
