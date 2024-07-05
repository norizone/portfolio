import { ListBody } from '@/types/api/front'

export const workKeys = {
  all: ['work'] as const,
  lists: () => [...workKeys.all, 'list'] as const,
  list: (filters: ListBody) => [...workKeys.lists(), { filters }] as const,
  details: () => [...workKeys.all, 'detail'] as const,
  detail: (id: number) => [...workKeys.details(), id] as const,
}

export const authKeys = {
  deflate: ['auth'] as const,
  login: () => [...authKeys.deflate, 'login'] as const,
  logout: () => [...authKeys.deflate, 'logout'] as const,
}
