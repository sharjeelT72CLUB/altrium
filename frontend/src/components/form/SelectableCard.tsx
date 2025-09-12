
interface SelectableCardProps {
    goal:{
        id: string,
        label: string,
        selected: boolean
    },
    toggleGoal: (id: string) => void
}

export default function SelectableCard({ goal, toggleGoal }: SelectableCardProps) {
  return (
    <button
    key={goal.id}
    onClick={() => toggleGoal(goal.id)}
    className={`flex items-center gap-3 p-10 rounded-xl border transition-all duration-200 ${
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
  )
}
