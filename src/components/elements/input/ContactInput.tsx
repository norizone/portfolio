import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './ContactInput.module.scss'

type InputType = 'text' | 'email' | 'textarea' | 'password'

type Props = {
  inputIndex: number
  label: string
  type: InputType
  nameLabel: string
  autocomplete?: 'name' | 'email'
  require?: boolean
  placeholder?: string
  hasError: number
  setError: ({
    index,
    errorState,
  }: {
    index: number
    errorState: number
  }) => void
  setValue: ({
    index,
    valueString,
  }: {
    index: number
    valueString: string
  }) => void
}

type ErrorMessages = Record<InputType, string>

const errorMessages: Record<number, ErrorMessages> = {
  0: { text: '', email: '', textarea: '', password: '' },
  1: {
    text: '入力してください',
    email: '入力してください',
    textarea: '入力してください',
    password: '入力してください',
  },
  2: {
    text: '入力してください',
    email: 'メールアドレスを正しく入力して下さい',
    textarea: '入力してください',
    password: '入力してください',
  },
}

export const ContactInput: FC<Props> = (props) => {
  const { setError, setValue } = props
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (props.hasError > 2) return
    const newErrorMessage = errorMessages[props.hasError][props.type] ?? ''
    setErrorMessage(newErrorMessage)
  }, [props.hasError])

  const setThisInputError = (errorState: number) => {
    setError({ index: props.inputIndex, errorState })
  }

  const setThisInputValue = (valueString: string) => {
    setValue({ index: props.inputIndex, valueString })
  }

  const handlerValidation = (checkValue: string = inputValue) => {
    props.require && onInputCheck(checkValue)
    if (props.hasError >= 0) return
    setErrorMessage(null)
  }

  const onInputCheck = (checkValue: string) => {
    if (checkValue.length <= 0) {
      setThisInputError(1)
    } else if (props.type === 'email') {
      emailValidate(checkValue)
    } else {
      setThisInputError(0)
      setThisInputValue(checkValue)
    }
  }

  const emailValidate = (checkValue: string) => {
    if (
      !checkValue.match(
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      )
    ) {
      setThisInputError(2)
    } else {
      setThisInputError(0)
      setThisInputValue(checkValue)
    }
  }

  return (
    <div className={styles.field}>
      <p className={styles.field__labels}>
        <span className={clsx(styles.field__label, 'upper')}>
          {props.label}
        </span>
        {props.require === true && (
          <strong className={styles.field__require}>require</strong>
        )}
      </p>
      <div className={styles['field__box-wrap']}>
        {props.type === 'textarea' ? (
          <textarea
            className={clsx(
              styles.field__box,
              styles.full,
              styles.field__textarea,
              errorMessage !== '' && styles.error
            )}
            name={props.nameLabel}
            onBlur={() => handlerValidation()}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputValue(event.target.value)
            }
            value={inputValue}
          ></textarea>
        ) : (
          <input
            className={clsx(
              styles.field__box,
              styles.full,
              errorMessage !== '' && styles.error
            )}
            type={props.type}
            value={inputValue}
            placeholder={props.placeholder}
            autoComplete={props.autocomplete}
            name={props.nameLabel}
            // reactでは自動入力時にonBlurの挙動が怪しいためonChangeに変更
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value)
              handlerValidation(event.target.value)
            }}
          />
        )}
        {errorMessage !== null}
        {<p className={styles.field__error}>{errorMessage}</p>}
      </div>
    </div>
  )
}
