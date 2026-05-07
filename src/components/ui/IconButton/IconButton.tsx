import { FC, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
}

export const IconButton: FC<Props> = ({ 
  icon, 
  variant = 'ghost', 
  size = 'medium', 
  ...restProps 
}) => {
  return (
    <button 
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      {...restProps}
    >
      {icon}
    </button>
  )
}

export default IconButton