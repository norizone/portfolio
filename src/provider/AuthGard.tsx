'use client'
import { useGetAuth, useMutationLogout } from '@/hooks/api/front.hooks'
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
  const { mutate: logoutMutate } = useMutationLogout();

  useEffect(() => {
    if (!data) return
    if (data.userId !== id) {
      setId(data.userId)
      // data.userId > 0 && logoutMutate();
    }
  }, [data])

  return <>{props.children}</>
}
