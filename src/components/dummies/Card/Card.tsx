import { FC } from 'react'
import styles from './styles.module.scss'

interface Props {
  title: string
  description: string
  imageUrl?: string
}

export const Card: FC<Props> = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.card}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

export default Card