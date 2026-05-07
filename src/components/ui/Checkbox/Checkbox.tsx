import { FC, ChangeEvent, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox: FC<Props> = ({ label, className = '', onChange, ...restProps }) => {
  
  // Вспомогательная функция для обработки клика
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e)
  }

  return (
    <label className={`${styles.wrapper} ${className}`}>
      <input 
        type="checkbox" 
        className={styles.input}
        onChange={handleChange}
        {...restProps} 
      />
      <span className={styles.customCheckbox}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}

export default Checkbox