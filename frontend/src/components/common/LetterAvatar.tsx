import React from 'react'

interface LetterAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export default function LetterAvatar({ 
  name, 
  size = 'md', 
  className = '',
  showBorder = false 
}: LetterAvatarProps) {
  // Get first letter and convert to uppercase
  const firstLetter = name.trim().charAt(0).toUpperCase()
  
  // Generate consistent color based on name hash
  const getAvatarColor = (name: string): string => {
    const colors = [
      'var(--color-avatar-1)',
      'var(--color-avatar-2)', 
      'var(--color-avatar-3)',
      'var(--color-avatar-4)',
      'var(--color-avatar-5)',
      'var(--color-avatar-6)',
      'var(--color-avatar-7)',
      'var(--color-avatar-8)',
      'var(--color-avatar-9)',
      'var(--color-avatar-10)'
    ]
    
    // Simple hash function for consistent color assignment
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-8 h-8 text-sm',
      text: 'text-sm'
    },
    md: {
      container: 'w-10 h-10 text-base',
      text: 'text-base'
    },
    lg: {
      container: 'w-12 h-12 text-lg',
      text: 'text-lg'
    },
    xl: {
      container: 'w-16 h-16 text-xl',
      text: 'text-xl'
    }
  }

  const config = sizeConfig[size]
  const backgroundColor = getAvatarColor(name)
  
  const baseClasses = `${config.container} ${config.text} rounded-full flex items-center justify-center font-semibold text-white select-none`
  const borderClasses = showBorder ? 'border-2 border-white/20' : ''
  const combinedClasses = `${baseClasses} ${borderClasses} ${className}`.trim()

  return (
    <div 
      className={combinedClasses}
      style={{ backgroundColor }}
      title={name}
    >
      {firstLetter}
    </div>
  )
}
