import { ReactNode } from 'react'
import styles from './PrimaryBtn.module.scss'


type Props = {
  children: ReactNode
  isLoading?: boolean
  onClick?: () => void
}

export const PrimaryBtn = (props: Props) => {
  const { children, isLoading, onClick } = props
  return (
    <button type="submit" onClick={onClick} className={styles.btn} disabled={isLoading}>
      {children}
    </button>
  )
}
