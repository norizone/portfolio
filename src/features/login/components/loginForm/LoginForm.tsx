'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/utils/validations'
import { PrimaryInput } from '@/components/elements/input/primaryInput/PrimaryInput'
import { LoginBody } from '@/types/api/front'
import { useMutateLogin } from '@/hooks/api/front.hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/elements/input/passwordInput/PasswordInput'
import { SubmitBtn } from '@/components/elements/btn/submitBtn/SubmitBtn'
import { FormLabel } from '@/components/elements/texts/formLabel/FormLabel'
// import { routers } from '@/routers/routers'
// import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'

export const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const {
    mutate: mutateLogin,
    isPending: isLoginPending,
    isError: isLoginError,
  } = useMutateLogin()

  const onSubmit = (data: LoginBody) => {
    mutateLogin(data, {
      onSuccess: () => {
        router.replace('/')
      },
      onError: (res) => {
        console.log(res)
        setErrorMessage(res?.message)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-[2em] p-[1em] text-left flex flex-col gap-[1.2em]">
        <FormLabel label="email" required errorMessage={errors?.email?.message}>
          <PrimaryInput
            type="email"
            autocomplete="email"
            {...register('email')}
          />
        </FormLabel>

        <FormLabel
          label="password"
          required
          errorMessage={errors?.email?.message}
        >
          <PasswordInput
            autocomplete="current-password"
            {...register('password')}
          />
        </FormLabel>

        <SubmitBtn text="Login" />

        {/* 
      {(isLoginError || isLSignUpError) && (
        <ErrorMessageBox customClassName="mt-[1em]">
          {errorMessage}
        </ErrorMessageBox>
      )}
      <div className="mt-[2em] flex-center">
        <PrimaryBtn
          isLoading={isLoginPending || isSignUpPending}
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
          onClick={() => {}}
        >
          Login
        </PrimaryBtn> */}
      </div>
    </form>
  )
}
