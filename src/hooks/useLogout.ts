import { useRouter } from 'next/navigation'
import { useMutateLLogout } from './api/front.hooks'
import { useResetWorksList } from './useResetWorkList'
import { routers } from '@/routers/routers'
import { useToggleModal } from './useToggleModal'
import { userId } from '@/stores/worksStates'
import { useSetAtom } from 'jotai'

export const useLogout = () => {
  const { mutate: mutateLogout } = useMutateLLogout()
  const { resetWorksList } = useResetWorksList()
  const setId = useSetAtom(userId)
  const {
    isOpenModal: isOpenLogoutModal,
    onOpenModal,
    onCloseModal,
  } = useToggleModal()
  const router = useRouter()

  const closeModal = () => {
    if (!isOpenLogoutModal) return
    onCloseModal()
    resetWorksList()
    router.replace(routers.HOME)
    router.refresh()
  }

  const onLogout = () => {
    mutateLogout(undefined, {
      onSuccess: () => {
        setId(0)
        onOpenModal()
      },
    })
  }
  return {
    onLogout,
    isOpenLogoutModal,
    closeModal,
  }
}
