import styles from './PrimaryTextarea.module.scss'
import { forwardRef } from 'react'
import clsx from 'clsx'
import BaseTextArea, { BaseTextAreaProps } from '../BaseTextarea'

export type Props = Omit<BaseTextAreaProps, 'textAreaClassName'> & {
  customClassName?: string
}

export const PrimaryTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const { customClassName, ...baseInputProps } = props

    return (
      <BaseTextArea
        ref={ref}
        textAreaClassName={clsx(styles.field__box, customClassName)}
        {...baseInputProps}
      />
    )
  }
)

PrimaryTextarea.displayName = 'PrimaryTextarea'
