import { atom } from 'jotai'
import { WorkItemRes } from '@/types/api/front'

export const activeWorkState = atom<number>(0)

export const composeWorksList = atom<WorkItemRes[]>([
  {
    id: 'dummy',
    titleEn: '',
    archiveImg: '',
    useTools: [],
  },
])

export const loadedImagesState = atom<Array<number>>([])
