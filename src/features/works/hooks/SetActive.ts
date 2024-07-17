'use client'
import { useAtom, useAtomValue } from 'jotai'
import { activeWorkState, composeWorksList } from '@/stores/worksStates'
import { useEffect } from 'react'

export const SetActive = ({ pageId }: { pageId: string | number }) => {
  const [_, setActiveWork] = useAtom(activeWorkState)
  const worksList = useAtomValue(composeWorksList)
  useEffect(() => {
    const pageIndex = worksList.findIndex((works) => works.id === pageId)
    const composePageIndex = pageIndex <= 0 ? 0 : pageIndex
    setActiveWork(composePageIndex)
  }, [])
}
