import { contactSchema, loginSchema } from '@/utils/validations'
import { z } from 'zod'

export type LoginSchema = z.infer<typeof loginSchema>

export type ContactSchema = z.infer<typeof contactSchema>
