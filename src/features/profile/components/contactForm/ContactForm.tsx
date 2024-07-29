'use client'
import styles from './ContactForm.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { contactSchema } from '@/utils/validations'
import { ContactSchema } from '@/types/form'
import { useSubmitContact } from '../../hooks/useSubmitContact'
import { FormLabel } from '@/components/elements/texts/formLabel/FormLabel'
import { PrimaryInput } from '@/components/elements/input/primaryInput/PrimaryInput'
import { PrimaryTextarea } from '@/components/elements/input/primaryTextarea/PrimaryTextarea'
import clsx from 'clsx'
import { SubmitBtn } from '@/components/elements/btn/submitBtn/SubmitBtn'

export const ContactForm = () => {
  const { onSubmit, errorMessage, isLoading, isError, isSuccess } =
    useSubmitContact()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({
    mode: 'onBlur',
    resolver: zodResolver(contactSchema),
  })

  return (
    <div className={styles.form} id="js-scrollTarget">
      {isSuccess && (
        <p className={styles['form__send-success']}>
          お問い合わせありがとうございました
        </p>
      )}
      {!isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormLabel label="name" required errorMessage={errors?.name?.message}>
            <PrimaryInput
              type="name"
              autocomplete="name"
              {...register('name')}
            />
          </FormLabel>

          <FormLabel
            label="email"
            required
            errorMessage={errors?.email?.message}
          >
            <PrimaryInput
              type="email"
              autocomplete="email"
              {...register('email')}
            />
          </FormLabel>

          <FormLabel
            label="message"
            required
            errorMessage={errors?.message?.message}
          >
            <PrimaryTextarea {...register('message')} />
          </FormLabel>

          <div className={styles.sendWrap}>
            {isError && (
              <p className={clsx(styles.sendError, 'flex-center')}>
                {errorMessage}
              </p>
            )}
            <SubmitBtn
              text='sending'
              sendingText='send message'
              isLoading={isLoading}
            />
          </div>
        </form>
      )}
    </div>
  )
}
