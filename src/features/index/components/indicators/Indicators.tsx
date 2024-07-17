'use client'
import clsx from 'clsx'
import { useEffect, type FC, useRef } from 'react'
import styles from './Indicators.module.scss'
import { activeWorkState } from '@/stores/worksStates'
import { WorkItemRes } from '@/types/api/front'
import { useAtomValue } from 'jotai'

type Props = {
  works: WorkItemRes[]
}

export const Indicators: FC<Props> = (props) => {
  const { works } = props
  const activeWork = useAtomValue(activeWorkState)
  const indicatorsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (indicatorsRef.current === null) return
    const indicatorsCount = works.length - 1
    const position =
      100 - ((indicatorsCount - activeWork) / indicatorsCount) * 100
    indicatorsRef.current.style.setProperty(
      '--indicator-position',
      `${position}% `
    )
  }, [activeWork, works])

  return (
    <div className={styles.indicators}>
      <div className={styles.indicators__inner} ref={indicatorsRef}>
        <p
          className={clsx(styles.indicators__text, 'upper')}
          dangerouslySetInnerHTML={{ __html: works[activeWork].titleEn }}
        ></p>
        <div className={styles.indicators__clip}>
          {works.map((el, index) => (
            <span
              className={clsx(
                styles.indicator,
                activeWork === index && styles.active
              )}
              key={index}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}
