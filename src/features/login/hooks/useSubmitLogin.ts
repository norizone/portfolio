import { useMutateLogin } from '@/hooks/api/front.hooks'
import { useResetWorksList } from '@/hooks/useResetWorkList'
import { routers } from '@/routers/routers'
import { LoginBody } from '@/types/api/front'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export const useSubmitLogin = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { mutate, isPending: isLoading, isError } = useMutateLogin()
  const { resetWorksList } = useResetWorksList()
  const pathName = usePathname()

  const onSubmit = (data: LoginBody) => {
    mutate(data, {
      onSuccess: () => {
        resetWorksList()
        router.replace(routers.HOME)
        router.refresh()
      },
      onError: (res) => {
        console.log(res)
        setErrorMessage(res?.message)
      },
    })
  }

  return {
    onSubmit,
    errorMessage,
    isLoading,
    isError,
  }
}
