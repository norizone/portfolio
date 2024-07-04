import { ReactNode } from 'react'
import styles from './SubmitBtn.module.scss'
import { LoadingIcon } from '../../icon/loadingIcon/LoadingIcon'
import { ArrowIcon } from '../../icon/ArrowIcon/ArrowIcon'

type Props = {
  text: string | ReactNode
  isLoading?: boolean
  sendingText?: string
}

export const SubmitBtn = (props: Props) => {
  const { text, isLoading, sendingText = 'sending' } = props
  return (
    <button type="submit" className={styles.btn} disabled={isLoading}>
      {!isLoading ? (
        <>
          <span className="upper">{text}</span>
          <ArrowIcon />
        </>
      ) : (
        <>
          <span className="upper">{sendingText}</span>
          <LoadingIcon />
        </>
      )}
    </button>
  )
}
