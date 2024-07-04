import * as yup from 'yup'

const ENTER_TEXT = 'を入力してください'
const SELECT_TEXT = 'を選択してください'

const requiredMessage = (title: string, type: 'input' | 'select' = 'input') => {
  switch (type) {
    case 'input':
      return `${title}${ENTER_TEXT}`
    case 'select':
      return `${title}${SELECT_TEXT}`
    default:
      return `${title}${ENTER_TEXT}`
  }
}

/**
 * loginフォーム
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('無効なメールアドレスです')
    .required(requiredMessage('メールアドレス')),
  password: yup.string().required(requiredMessage('パスワード')),
})

/**
 * contact
 */
export const contactSchema = yup.object({
  name: yup.string().required(requiredMessage('name')),
  email: yup
    .string()
    .email('無効なメールアドレスです')
    .required(requiredMessage('メールアドレス')),
  message: yup.string().required(requiredMessage('お問い合わせ内容')),
})
