'use client'
import clsx from 'clsx'
import { FC, useEffect, useCallback, useRef, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import axios from 'axios'
import { useRecoilState } from 'recoil'

import styles from './ViewMore.module.scss'
import { LoadingIcon } from '@/components/elements/icon/loadingIcon/LoadingIcon'
import { composeWorksList } from '@/stores/worksStates'

type Props = {
  totalCount: number
}

const getList = async (url: string, { arg }: { arg: number }) => {
  return axios
    .get(`${url}?offset=${arg}&limit=5`, {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'fetch',
      },
    })
    .then((res) => res)
}

const observerOptions = {
  root: null,
  rootMargin: '50% 0px',
  threshold: 0,
}

export const ViewMore: FC<Props> = (props) => {
  const { totalCount } = props
  const [works, setWorks] = useRecoilState(composeWorksList)
  const handlerIsMore = works.length > totalCount ? false : true
  const [isMore, setIsMore] = useState<boolean>(handlerIsMore)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { trigger } = useSWRMutation('/api/list/', getList, {
    onSuccess: (data) => {
      const newWorks = [...works, ...data.data['contents']]
      newWorks.length > totalCount ? setIsMore(false) : setIsMore(true)
      setWorks(newWorks)
      setIsLoading(false)
    },
  })

  const getAddApi = useCallback(() => {
    if (!isMore || isLoading) return
    setIsLoading(true)
    trigger(works.length - 1)
  }, [isLoading, isMore, works])

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            getAddApi()
          }, 500)
        }
      })
    },
    [getAddApi]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )
    targetRef.current && observer.observe(targetRef.current)
    !isMore && observer.disconnect()
    return () => {
      observer.disconnect()
    }
  }, [targetRef, handleIntersection, isMore])

  return (
    <div className={styles.footer} ref={targetRef}>
      <div className={styles.footer__btn}>
        {isMore && (
          <button className={clsx(styles.btn, 'upper')} onClick={getAddApi}>
            {isLoading ? 'LOADING...' : 'VIEW MORE'}
            <span className={styles.icon}>
              <LoadingIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
