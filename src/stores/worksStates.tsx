import { atom } from 'jotai'
import { WorkItemRes } from '@/types/api/front'
import { DEFAULT_PAGE, DEFAULT_WORK } from '@/utils/const'

export const activeWorkState = atom<number>(0)

export const composeWorksList = atom<WorkItemRes[]>(DEFAULT_WORK)

export const loadedPage = atom<number>(DEFAULT_PAGE)

export const loadedImagesState = atom<Array<number>>([])

export const userId = atom<number | null>(null)