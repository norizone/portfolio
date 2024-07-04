import styles from './Input.module.scss'
import { forwardRef } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import clsx from 'clsx'

export type Props = Omit<BaseInputProps, 'inputClassName'> & {
  customClassName?: string
}

export const PrimaryInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { customClassName, ...baseInputProps } = props

    return (
      <BaseInput
        ref={ref}
        inputClassName={clsx(styles.field__box, styles.full, customClassName)}
        {...baseInputProps}
      />
    )
  }
)

PrimaryInput.displayName = 'PrimaryInput'
