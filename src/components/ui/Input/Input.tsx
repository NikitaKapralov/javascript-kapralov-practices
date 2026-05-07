import { FC, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

// Расширяем стандартные атрибуты input, чтобы работали type, placeholder и т.д.
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: FC<Props> = ({ label, error, className = '', ...restProps }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      <input 
        className={`${styles.input} ${error ? styles.inputError : ''}`} 
        {...restProps} 
      />
      
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default Input