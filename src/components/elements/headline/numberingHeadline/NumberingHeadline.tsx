import { FC } from 'react'
import styles from './NumberingHeadline.module.scss'

type Props = {
  numbering?: number | string
  text: string
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const NumberingHeadLine: FC<Props> = (props) => {
  const { numbering = null, text, tag } = props
  const Tag = tag
  return (
    <Tag className={styles.headline}>
      {numbering}
      {numbering !== null && '.'}
      {text}
    </Tag>
  )
}
