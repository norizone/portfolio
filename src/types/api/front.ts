import { Work, User, Tool } from '@prisma/client'
import { ContactSchema, LoginSchema } from '../form'

/**
 * General
 */
export type ListBody = {
  page: number
  pageSize: number
}

/**
 * auth
 */
export type AuthData = {
  id?: number
  email?: string
}

/**
 * login
 */
export type LoginBody = LoginSchema

/**
 * Work
 */
export type WorkTool = {
  toolName: string
}

export type DetailWork = Omit<
  Work,
  | 'createdAt'
  | 'permission'
  | 'order'
  | 'publication'
  | 'updateAt'
  | 'archiveImg'
> & {
  useTools: WorkTool[]
}

export type NextWork = Pick<Work, 'titleEn' | 'id'>

export type DetailWorkRes = {
  item: DetailWork
  nextContents: NextWork | null
}

export type WorkItemRes = Pick<Work, 'archiveImg' | 'titleEn'> & {
  id: string | number
  useTools: WorkTool[]
}

export type WorkListRes = {
  items: WorkItemRes[]
  totalPages: number
  totalCount: number
}

/**
 * User
 */
export type UserData = Omit<User, 'hashedPassword'>

export type CreateUserBody = EditUserBody & {
  password: string
}

export type EditUserBody = {
  email: string
  permission: number
}

/**
 * contact
 */
export type ContactBody = ContactSchema
