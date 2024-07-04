import Link from 'next/link'
import { FC } from 'react'
import styles from './PrimaryLink.module.scss'

type Props = {
  tag: 'a' | 'Link'
  text?: React.ReactNode | undefined
  hrefLink: string
  targetBlank?: boolean
}

export const PrimaryLink: FC<Props> = (props) => {
  const { tag, text = 'visit website', hrefLink, targetBlank = false } = props
  const icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11.981"
        height="11.981"
        viewBox="0 0 11.981 11.981"
      >
        <g transform="translate(-2535.428 -1230.99)">
          <path
            d="M2539.876,1231.49h7.033v7.033"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            x1="11.128"
            y2="11.128"
            transform="translate(2535.781 1231.49)"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </g>
      </svg>
    )
  }
  return (
    <>
      {tag === 'a' && (
        <a
          className={styles.link}
          href={hrefLink}
          target={targetBlank ? '_blank' : '_self'}
          rel={targetBlank ? 'noreferrer noopener' : ''}
        >
          <span>{text}</span>
          {targetBlank && icon()}
        </a>
      )}
      {tag === 'Link' && (
        <Link className={styles.link} href={hrefLink}>
          {text}
        </Link>
      )}
    </>
  )
}
