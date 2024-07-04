'use client'
import { useRecoilState } from 'recoil'
import { activeWorkState } from '@/stores/worksStates'
import { useEffect } from 'react'

export const SetActive = () => {
  const [_, setActiveWork] = useRecoilState(activeWorkState)
  useEffect(() => {
    setActiveWork(0)
  }, [])
  return <></>
}
