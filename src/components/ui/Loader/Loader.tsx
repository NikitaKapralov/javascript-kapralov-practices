import { FC } from 'react'
import styles from './styles.module.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

export const Loader: FC<Props> = ({ size = 'medium' }) => {
  return <div className={`${styles.loader} ${styles[size]}`} />
}

export default Loader