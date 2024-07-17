'use client'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeWorkState, composeWorksList } from '@/stores/worksStates'
import { useEffect } from 'react'

export const SetActive = ({ pageId }: { pageId: string | number }) => {
  const [_, setActiveWork] = useRecoilState(activeWorkState)
  const worksList = useRecoilValue(composeWorksList)
  useEffect(() => {
    const pageIndex = worksList.findIndex((works) => works.id === pageId)
    const composePageIndex = pageIndex <= 0 ? 0 : pageIndex
    setActiveWork(composePageIndex)
  }, [])
  return <></>
}
