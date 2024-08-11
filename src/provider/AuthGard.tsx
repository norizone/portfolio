'use client'
import { LogoutModal } from '@/components/elements/modal/logoutModal/LogoutModal'
import { useGetAuth } from '@/hooks/api/front.hooks'
import { useLogout } from '@/hooks/useLogout'
import { routers } from '@/routers/routers'
import { userId } from '@/stores/worksStates'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const AuthGuard = (props: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [id, setId] = useAtom(userId)
  const { data, isLoading, isError } = useGetAuth(
    pathname !== routers.LOGIN,
    true,
  )
  const { onLogout, closeModal, isOpenLogoutModal } = useLogout()

  useEffect(() => {
    if (!data || isError) return
    if (data.userId !== id) {
      setId(data.userId)
      if (id === null || id === 0) return;
      data.userId === 0 && onLogout();
    }
  }, [data, isError])

  return (
    <>{props.children}
      <LogoutModal
        title={`セッションの有効期限が切れたため\nログアウトしました`}
        isOpen={isOpenLogoutModal}
        onClose={closeModal}
      />
    </>)
}
