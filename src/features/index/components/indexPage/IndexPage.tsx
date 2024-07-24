'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainContents } from '@/features/index/components/mainContents/MainContents'
import { ViewMore } from '../viewMore/ViewMore'
import { Indicators } from '../indicators/Indicators'
import styles from './IndexPage.module.scss'
import { activeWorkState, composeWorksList } from '@/stores/worksStates'
import { WorkListRes } from '@/types/api/front'
import { useGetWorkList, useMutateWorkList } from '@/hooks/api/front.hooks'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useAtom, useAtomValue } from 'jotai'

type Props = {
  SSRData: WorkListRes
  pageSize: number
  defaultPage: number
}

export const IndexPage = (props: Props) => {
  const { SSRData, pageSize, defaultPage } = props
  const { totalPages, items } = SSRData
  const [page, setPage] = useState(defaultPage)
  const viewMoreRef = useRef<HTMLButtonElement | null>(null)
  const [works, setWorks] = useAtom(composeWorksList)
  const activeIndex = useAtomValue(activeWorkState)
  const activeWork = useRef<number>(activeIndex)

  useEffect(() => {
    setWorks([...works, ...items])
  }, [items])

  const { mutate: mutateWorkList, isPending: isLoadingWorkList } =
    useMutateWorkList()

  const handleChangePage = (page: number) => {
    mutateWorkList(
      {
        page,
        pageSize,
      },
      {
        onSuccess: (res) => {
          const currentIds = new Set(works.map((work) => work.id))
          const newWorks = res.items.filter((item) => !currentIds.has(item.id))
          setWorks((prev) => {
            return [...prev, ...newWorks]
          })
        },
      }
    )
  }

  const onChangePage = () => {
    if (page >= totalPages) return
    const newValue = page + 1
    setPage(newValue)
    handleChangePage(newValue)
  }

  const { handleObserve } = useIntersectionObserver({
    totalPages,
    onChangePage,
    page,
    isLoading: isLoadingWorkList,
  })

  useLayoutEffect(() => {
    if (!viewMoreRef || !viewMoreRef.current) return
    handleObserve(viewMoreRef)
  }, [handleObserve, viewMoreRef])

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
            btnHidden={page >= totalPages}
          />
        )}
      </div>
      {works.length > 1 && <Indicators works={works} />}
    </>
  )
}
