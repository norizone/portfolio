import styles from './Input.module.scss'

export type ErrorMessageProps = {
  errorMessage?: string
  className?: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { errorMessage = '', className } = props
  return <span className={styles.field__error}>{errorMessage}</span>
}
