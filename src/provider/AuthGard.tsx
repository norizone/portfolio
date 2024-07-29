'use client'
import { PrimaryModal } from '@/components/elements/modal/primaryModal/PrimaryModal'
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
  const { data, isLoading } = useGetAuth(
    pathname !== routers.LOGIN,
    true,
  )
  const { onLogout } = useLogout()

  useEffect(() => {
    if (!data) return
    if (data.userId !== id) {
      setId(data.userId)
      if (id === null || id === 0) return;
      //TODO: ポップアップでログアウトが切れたお知らせ出す。セッションの有効期限が切れたためログアウトしました。
      data.userId === 0 && onLogout();
    }
  }, [data])

  return (
    <>{props.children}</>)
}
