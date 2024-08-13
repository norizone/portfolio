import { FC } from 'react'
import styles from './PrimaryHeadline.module.scss'
import clsx from 'clsx'

type Props = {
  text: string
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export const PrimaryHeadline: FC<Props> = (props) => {
  const { text, tag } = props
  const Tag = tag
  return (
    <Tag
      className={clsx(styles.headline, 'pre')}
    >{text}</Tag>
  )
}
