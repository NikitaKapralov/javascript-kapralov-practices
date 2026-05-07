import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface Props {
  label?: string
  options: string[]
  placeholder?: string
}

export const MultiDropdown: FC<Props> = ({ label, options, placeholder = 'Select options...' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(item => item !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  const displayValue = selected.length > 0 ? selected.join(', ') : placeholder

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.container}>
        <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
          {displayValue}
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {options.map(option => (
              <div 
                key={option} 
                className={styles.option}
                onClick={() => toggleOption(option)}
              >
                <span className={`${styles.checkbox} ${selected.includes(option) ? styles.checked : ''}`}>
                  {selected.includes(option) ? '✓' : ''}
                </span>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiDropdown