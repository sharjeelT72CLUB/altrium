import React from 'react'

interface TextInputProps {
  label?: string;
  placeholder: string;
  type: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function TextInput({ 
  label, 
  placeholder, 
  type, 
  className = '',
  value,
  onChange,
  required = false,
  disabled = false
}: TextInputProps) {
  const baseClasses = "bg-bg-input p-4 rounded-lg text-text-primary placeholder-[#7A7A7A] text-base w-full border border-transparent focus:border-primary focus:outline-none transition-all duration-200";
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`.trim();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-primary text-sm font-medium mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={combinedClasses}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
