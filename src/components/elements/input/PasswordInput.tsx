import styles from './Input.module.scss'
import { HTMLInputTypeAttribute, forwardRef, useState } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { VisibilityIcon } from '../icon/VisibilityIcon'
import clsx from 'clsx'

export type Props = Omit<BaseInputProps, 'inputClassName' | 'type'> & {
  customClassName?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { customClassName, ...baseInputProps } = props
    const [inputType, setInputType] =
      useState<HTMLInputTypeAttribute>('password')

    const handlerPasswordType = () => {
      const newType = inputType === 'password' ? 'text' : 'password'
      setInputType(newType)
    }

    return (
      <div
        className={
          'flex flex-row flex-nowrap border border-border w-full rounded-sm overflow-hidden'
        }
      >
        <BaseInput
          ref={ref}
          inputClassName={clsx(styles.field__box, styles.full, customClassName)}
          type={inputType}
          {...baseInputProps}
        />
        <button
          type="button"
          onClick={handlerPasswordType}
          className="fill-border hover:fill-primary transition-all w-[30px] px-[5px] rounded-sm"
          aria-label={
            inputType === 'password'
              ? 'パスワードを表示する'
              : 'パスワードを隠す'
          }
        >
          <VisibilityIcon isVisibility={inputType === 'password'} />
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
