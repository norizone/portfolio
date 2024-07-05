import styles from './FormLabel.module.scss'
import { ReactNode } from 'react'
import {
  ErrorMessageProps,
  FieldErrorMessage,
} from '../errorMessage/FieldErrorMessage'
import { LabelText, LabelTextProps } from '../LabelText/LabelText'

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
        {errorMessage && <FieldErrorMessage errorMessage={errorMessage} />}
      </div>
    </div>
  )
}
