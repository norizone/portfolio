import clsx from 'clsx'
import styles from './LabelText.module.scss'
import { ElementType, LabelHTMLAttributes } from 'react'

export type LabelTextProps = {
  label: string
  as?: ElementType
  required?: boolean
  labelClassName?: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

export const LabelText = (props: LabelTextProps) => {
  const {
    as: CustomTag = 'label',
    label,
    required = false,
    labelClassName,
    labelProps,
  } = props
  return (
    <CustomTag {...labelProps} className={styles.field__labels}>
      <span className={clsx(styles.field__label, 'upper', labelClassName)}>
        {label}
      </span>
      {required && <strong className={styles.field__require}>require</strong>}
    </CustomTag>
  )
}
