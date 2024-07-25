import { composeWorksList } from '@/stores/worksStates'
import { DEFAULT_WORK } from '@/utils/const'
import { useSetAtom } from 'jotai'

export const useResetComposeWorksList = () => {
  const setComposeWorksList = useSetAtom(composeWorksList)

  const resetComposeWorksList = () => {
    setComposeWorksList(DEFAULT_WORK)
  }

  return {
    resetComposeWorksList,
  }
}
