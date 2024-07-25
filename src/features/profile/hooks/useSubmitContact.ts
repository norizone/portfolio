import { useMutateContact } from '@/hooks/api/front.hooks'
import { ContactBody } from '@/types/api/front'
import { useState } from 'react'

export const useSubmitContact = () => {
  const { mutate, isPending: isLoading, isError } = useMutateContact()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = (data: ContactBody) => {
    mutate(data, {
      onSuccess: () => {
        setIsSuccess(true)
      },
      onError: (res) => {
        console.log(res)
        setErrorMessage('送信に失敗しました')
      },
    })
  }

  return {
    onSubmit,
    errorMessage,
    isLoading,
    isError,
    isSuccess,
  }
}
