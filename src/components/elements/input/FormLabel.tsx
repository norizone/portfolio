import styles from './Input.module.scss'
import { ErrorMessage, ErrorMessageProps } from './ErrorMessage'
import { LabelText, LabelTextProps } from './LabelText'
import { ReactNode } from 'react'

type Props = LabelTextProps &
  ErrorMessageProps & {
    children: ReactNode
    customClassName?: string
  }

export const FormLabel = (props: Props) => {
  const { errorMessage, children, customClassName, ...labelProps } = props
  return (
    <div className={styles.field}>
      <LabelText {...labelProps} />
      <div className={styles['field__box-wrap']}>
        {children}
        {errorMessage && (
          <ErrorMessage
            errorMessage={errorMessage}
            className="absolute bottom-[-1.8em] ml-[1em]"
          />
        )}
      </div>
    </div>
  )
}
