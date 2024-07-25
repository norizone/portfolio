import { z } from 'zod'

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
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, requiredMessage('メールアドレス'))
    .email('無効なメールアドレスです'),
  password: z.string().trim().min(1, requiredMessage('パスワード')),
})

/**
 * contact
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, requiredMessage('お名前')),
  email: z
    .string()
    .email('無効なメールアドレスです')
    .min(1, requiredMessage('メールアドレス')),
  message: z.string().min(1, requiredMessage('お問い合わせ内容')),
})
