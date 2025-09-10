import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  const baseClasses = 'p-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
    secondary: 'bg-white text-black hover:bg-gray-100 focus:ring-gray-300'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

  return (
    <button 
      onClick={onClick} 
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
