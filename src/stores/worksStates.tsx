import { atom } from 'recoil'

import type { ListWorksContents } from '@/types/works'

export const activeWorkState = atom<number>({
  key: 'activeWorkState',
  default: 0,
})

export const composeWorksList = atom<Array<ListWorksContents>>({
  key: 'composeWorksList',
  default: [
    {
      id: 'dummy',
      title_en: '',
      archive_img: {
        url: '',
        height: 0,
        width: 0,
      },
      use_tools: [''],
    },
  ],
})

export const loadedImagesState = atom<Array<number>>({
  key: 'loadedImagesState',
  default: [],
})
