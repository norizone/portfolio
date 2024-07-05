import styles from './FieldErrorMessage.module.scss'

export type ErrorMessageProps = {
  errorMessage?: string
  className?: string
}

export const FieldErrorMessage = (props: ErrorMessageProps) => {
  const { errorMessage = '', className } = props
  return <p className={styles.field__error}>{errorMessage}</p>
}
