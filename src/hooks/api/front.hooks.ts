import {
  useQueryClient,
  useMutation,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { Work } from '@prisma/client'
import { axiosClient } from '@/utils/axios'
import { authKeys, workKeys } from './queryKeys'
import {
  AuthData,
  ListBody,
  WorkListRes,
  ContactBody,
  LoginBody,
} from '@/types/api/front'
import { workApiUrl } from '@/utils/apiUrl'
import { getAuth } from './auth'
import axios from 'axios'

/*
  auth
*/

export const useGetAuth = (
  enabled?: boolean,
  refetchOnWindowFocus?: boolean
) => {
  return useQuery({
    queryKey: authKeys.deflate,
    queryFn: () => getAuth(),
    enabled,
    refetchOnWindowFocus,
  })
}

export const useMutateLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<AuthData> => {
      const res = await axiosClient.post(`/auth/login`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useMutateLLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      const res = await axiosClient.post(`/auth/logout`, undefined)
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

/*
  work
*/
export const useGetWorkList = (ListBody: ListBody, SSRData?: WorkListRes) => {
  return useQuery<WorkListRes>({
    queryKey: workKeys.list(ListBody),
    queryFn: async (): Promise<WorkListRes> => {
      const res = await axiosClient.post(workApiUrl.list(), ListBody)
      return res.data
    },
    initialData: SSRData,
    placeholderData: keepPreviousData,
  })
}

export const useMutateWorkList = () => {
  return useMutation({
    mutationFn: async (ListBody: ListBody): Promise<WorkListRes> => {
      const res = await axiosClient.post(workApiUrl.list(), ListBody)
      return res.data
    },
  })
}

export const useGetWork = (id: number, SSRData?: Work) => {
  return useQuery<Work>({
    queryKey: workKeys.detail(id),
    queryFn: async (): Promise<Work> => {
      const res = await axiosClient.get(`/work/detail/${id}`)
      return res.data
    },
    initialData: SSRData,
  })
}

/**
 * contact
 */
export const useMutateContact = () => {
  return useMutation({
    mutationFn: async (sendData: ContactBody) => {
      const res = await axios.post('/api/email', sendData)
      return res.data
    },
  })
}
