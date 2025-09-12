
interface LargeCheckboxProps {
  goal: {
    id: string
    label: string
    selected: boolean
  }
  toggleGoal: (id: string) => void
}

export default function LargeCheckbox({ goal, toggleGoal }: LargeCheckboxProps) {
  return (
    <button
    key={goal.id}
    onClick={() => toggleGoal(goal.id)}
    className={`flex items-center gap-3 p-6 rounded-xl border transition-all duration-200 ${
      goal.selected
        ? 'border-white bg-bg-input'
        : 'border-border bg-bg-input hover:border-white/50'
    }`}
  >
    {/* Checkbox */}
    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
      goal.selected
        ? 'border-white bg-white'
        : 'border-text-muted bg-transparent'
    }`}>
      {goal.selected && (
        <svg className='w-3 h-3 text-bg-input' fill='currentColor' viewBox='0 0 20 20'>
          <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
        </svg>
      )}
    </div>
    
    {/* Label */}
    <span className='text-text-primary font-medium text-left'>
      {goal.label}
    </span>
  </button>
  )
}
