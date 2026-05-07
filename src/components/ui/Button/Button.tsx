import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
}

export const Button: FC<Props> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...restProps 
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button