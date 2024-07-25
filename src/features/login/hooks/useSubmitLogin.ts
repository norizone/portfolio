import { useMutateLogin } from '@/hooks/api/front.hooks'
import { routers } from '@/routers/routers'
import { LoginBody } from '@/types/api/front'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useSubmitLogin = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const { mutate, isPending: isLoading, isError } = useMutateLogin()

  const onSubmit = (data: LoginBody) => {
    mutate(data, {
      onSuccess: () => {
        router.replace(routers.HOME)
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
