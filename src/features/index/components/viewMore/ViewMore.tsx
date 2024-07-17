'use client'
import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './ViewMore.module.scss'
import { LoadingIcon } from '@/components/elements/icon/loadingIcon/LoadingIcon'

type Props = {
  isLoading: boolean
  onChangePage: () => void
  btnHidden?: boolean
}

export const ViewMore = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isLoading, onChangePage, btnHidden = false } = props

  return (
    <div className={styles.footer} ref={ref}>
      <div className={styles.footer__btn}>
        <button
          className={clsx(styles.btn, 'upper', btnHidden && 'hidden')}
          onClick={onChangePage}
          disabled={!isLoading}
        >
          {isLoading ? 'LOADING...' : 'VIEW MORE'}
          <span className={styles.icon}>
            <LoadingIcon />
          </span>
        </button>
      </div>
    </div>
  )
})

ViewMore.displayName = 'ViewMore'
