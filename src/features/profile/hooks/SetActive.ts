'use client'
import { useAtom } from 'jotai'
import { activeWorkState } from '@/stores/worksStates'
import { useEffect } from 'react'

export const SetActive = () => {
  const [_, setActiveWork] = useAtom(activeWorkState)
  useEffect(() => {
    setActiveWork(0)
  }, [])
}
