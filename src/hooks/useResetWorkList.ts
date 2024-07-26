import {
  activeWorkState,
  composeWorksList,
  loadedImagesState,
  loadedPage,
} from '@/stores/worksStates'
import { DEFAULT_PAGE, DEFAULT_WORK } from '@/utils/const'
import { useSetAtom } from 'jotai'
import { useCurrentWork } from './useCurrentWork'

export const useResetWorksList = () => {
  const setComposeWorksList = useSetAtom(composeWorksList)
  const setLoadedPage = useSetAtom(loadedPage)
  const setActiveWorkState = useSetAtom(activeWorkState)
  const setLoadedImagesState = useSetAtom(loadedImagesState)
  const { setCurrent } = useCurrentWork()

  const resetWorksList = () => {
    setComposeWorksList(DEFAULT_WORK)
    setLoadedPage(DEFAULT_PAGE)
    setLoadedImagesState([])
    setActiveWorkState(0)
    setCurrent()
  }

  return {
    resetWorksList,
  }
}
