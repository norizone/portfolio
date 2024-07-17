import { atom } from 'recoil'
import { WorkItemRes } from '@/types/api/front'

export const activeWorkState = atom<number>({
  key: 'activeWorkState',
  default: 0,
})

export const composeWorksList = atom<Array<WorkItemRes>>({
  key: 'composeWorksList',
  default: [
    {
      id: 'dummy',
      titleEn: '',
      archiveImg: '',
      useTools: [],
    },
  ],
})

export const loadedImagesState = atom<Array<number>>({
  key: 'loadedImagesState',
  default: [],
})
