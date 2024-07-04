'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { loginSchema } from '@/utils/validations'
// import { FormLabel } from '@/components/elements/textBlock/FormLabel'
// import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
// import { LoginBody } from '@/types/api/admin'
// import { useMutateLogin, useMutateSignUp } from '@/hooks/api/admin.hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormLabel } from '@/components/elements/input/FormLabel'
import { PasswordInput } from '@/components/elements/input/PasswordInput'
import { SubmitBtn } from '@/components/elements/btn/submitBtn/SubmitBtn'
// import { routers } from '@/routers/routers'
// import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'
// import { PasswordInput } from '@/components/elements/input/PasswordInput'

export const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginBody>({
  //   mode: 'onBlur',
  //   resolver: yupResolver(loginSchema),
  // })

  // const {
  //   mutate: mutateLogin,
  //   isPending: isLoginPending,
  //   isError: isLoginError,
  // } = useMutateLogin()

  // const {
  //   mutate: mutateSignUp,
  //   isPending: isSignUpPending,
  //   isError: isLSignUpError,
  // } = useMutateSignUp()

  // const onSubmit = (data: LoginBody) => {
  //   mutateLogin(data, {
  //     onSuccess: () => {
  //       router.replace(routers.DASHBOARD)
  //     },
  //     onError: (res) => {
  //       console.log(res)
  //       setErrorMessage(res?.message)
  //     },
  //   })
  // }

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mt-[2em] p-[1em] text-left flex flex-col gap-[1.2em]">
        <FormLabel
          label="email"
          required
          // errorMessage={errors?.email?.message}
        >
          <PrimaryInput
            type="email"
            autocomplete="email"
            // {...register('email')}
          />
        </FormLabel>

        <FormLabel
          label="password"
          required
          // errorMessage={errors?.email?.message}
        >
          <PasswordInput
            autocomplete="current-password"
            // {...register('password')}
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
