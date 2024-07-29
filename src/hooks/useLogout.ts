import { useRouter } from 'next/navigation'
import { useMutateLLogout } from './api/front.hooks'
import { useResetWorksList } from './useResetWorkList'
import { routers } from '@/routers/routers'

export const useLogout = () => {
  const { mutate: mutateLogout } = useMutateLLogout()
  const { resetWorksList } = useResetWorksList()
  const router = useRouter()

  const onLogout = () => {
    mutateLogout(undefined, {
      onSuccess: () => {
        resetWorksList()
        router.replace(routers.HOME)
        router.refresh()
      },
    })
  }
  return {
    onLogout,
  }
}
