'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { activeWorkState, composeWorksList } from '@/stores/worksStates'

export const useCurrentWork = () => {
  const setActiveWork = useSetAtom(activeWorkState)
  const worksList = useAtomValue(composeWorksList)
  const setCurrent = (pageId?: string | number) => {
    if (!pageId) setActiveWork(0)
    const pageIndex = worksList.findIndex((works) => works.id === pageId)
    const composePageIndex = pageIndex <= 0 ? 0 : pageIndex
    setActiveWork(composePageIndex)
  }
  return {
    setCurrent,
  }
}
