'use client'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/utils/validations'
import { LoginSchema } from '@/types/form'
import { PrimaryInput } from '@/components/elements/input/primaryInput/PrimaryInput'
import { PasswordInput } from '@/components/elements/input/passwordInput/PasswordInput'
import { FormLabel } from '@/components/elements/texts/formLabel/FormLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './LoginForm.module.scss'
import clsx from 'clsx'
import { useSubmitLogin } from '../../hooks/useSubmitLogin'
import { SubmitBtn } from '@/components/elements/btn/submitBtn/SubmitBtn'

export const LoginForm = () => {
  const {
    onSubmit: onSubmitLogin,
    errorMessage,
    isLoading,
    isError,
  } = useSubmitLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} noValidate>
      <div>
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
          errorMessage={errors?.password?.message}
        >
          <PasswordInput
            autocomplete="current-password"
            {...register('password')}
          />
        </FormLabel>
        <div className={styles.submitWrap}>
          {isError && (
            <p className={clsx(styles.submitError, 'flex-center')}>
              {errorMessage}
            </p>
          )}
          <SubmitBtn isLoading={isLoading} text="Login" />
        </div>
      </div>
    </form>
  )
}
