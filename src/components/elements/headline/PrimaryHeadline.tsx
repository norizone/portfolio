import { FC } from 'react'
import styles from './PrimaryHeadline.module.scss'

type Props = {
  text: string | TrustedHTML
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export const PrimaryHeadline: FC<Props> = (props) => {
  const { text, tag } = props
  const Tag = tag
  return (
    <Tag
      className={styles.headline}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
