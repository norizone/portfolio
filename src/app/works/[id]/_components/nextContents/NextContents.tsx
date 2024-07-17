import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import styles from './NextContents.module.scss'
import { PrimaryHeadline } from '@/components/elements/headline/primaryHeadline/PrimaryHeadline'
import { NextWork } from '@/types/api/front'

type Props = { contents: NextWork }

export const NextContents: FC<Props> = (props) => {
  const { contents } = props

  return (
    <>
      <div className={styles.pageNext}>
        <p className={clsx('upper', styles.pageNext__titles)}>
          <span className={styles.pageNext__title}>NEXT WORK</span>
          <span className={styles.pageNext__line}></span>
        </p>
        <Link className={styles.pageNext__link} href={`/works/${contents.id}`}>
          <PrimaryHeadline tag={'p'} text={contents.titleEn} />
        </Link>
      </div>
    </>
  )
}
