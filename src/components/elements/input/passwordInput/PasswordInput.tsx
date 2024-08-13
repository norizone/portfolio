import primaryStyles from '../primaryInput/PrimaryInput.module.scss'
import style from './PasswordInput.module.scss'
import { HTMLInputTypeAttribute, forwardRef, useState } from 'react'
import BaseInput, { BaseInputProps } from '../BaseInput'
import { VisibilityIcon } from '../../icon/VisibilityIcon'
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
      <div className={style.wrap}>
        <BaseInput
          ref={ref}
          inputClassName={clsx(primaryStyles.field__box, customClassName)}
          type={inputType}
          {...baseInputProps}
        />
        <button
          type="button"
          onClick={handlerPasswordType}
          className={style.icon}
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
