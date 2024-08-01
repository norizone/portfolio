'use client'

import { useCurrentWork } from '@/hooks/useCurrentWork'

export const SetCurrent = ({ pageId }: { pageId: number }) => {
  const { setCurrent } = useCurrentWork()
  setCurrent(pageId)
  return <></>
}
