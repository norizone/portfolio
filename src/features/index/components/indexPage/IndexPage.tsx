'use client'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { MainContents } from '@/features/index/components/mainContents/MainContents'
import { ViewMore } from '../viewMore/ViewMore'
import { Indicators } from '../indicators/Indicators'
import styles from './IndexPage.module.scss'
import { activeWorkState, composeWorksList, loadedPage } from '@/stores/worksStates'
import { WorkListRes } from '@/types/api/front'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useAtom, useAtomValue } from 'jotai'
import { useChangePage } from '../../hooks/useChangePage'

type Props = {
  SSRData: WorkListRes
  pageSize: number
}

export const IndexPage = (props: Props) => {
  const { SSRData, pageSize } = props
  const { totalPages, items } = SSRData
  const viewMoreRef = useRef<HTMLButtonElement | null>(null)
  const [works, setWorks] = useAtom(composeWorksList)
  const activeIndex = useAtomValue(activeWorkState)
  const currentPage = useAtomValue(loadedPage)
  const activeWork = useRef<number>(activeIndex)

  useEffect(() => {
    if (works.length > 1) return
    setWorks([...works, ...items])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const { onChangePage, isLoadingWorkList } = useChangePage({
    pageSize,
    totalPages,
  })

  const { handleObserve } = useIntersectionObserver({
    totalPages,
    onChangePage,
    isLoading: isLoadingWorkList,
  })

  useLayoutEffect(() => {
    if (!viewMoreRef || !viewMoreRef.current) return
    handleObserve(viewMoreRef)
  }, [handleObserve, viewMoreRef]);

  return (
    <>
      <div className={styles.index_contents__wrap} id="js-canvasTargetWrap">
        {works.map((el, index) => (
          <MainContents
            contents={el}
            key={index}
            contentsIndex={index}
            isScrollTarget={activeWork.current === index ? true : false}
          />
        ))}
        {works.length > 1 && (
          <ViewMore
            isLoading={isLoadingWorkList}
            onChangePage={onChangePage}
            ref={viewMoreRef}
            btnHidden={currentPage >= totalPages}
          />
        )}
      </div>
      {works.length > 1 && <Indicators works={works} />}
    </>
  )
}
