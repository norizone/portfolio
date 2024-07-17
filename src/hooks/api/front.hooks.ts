import { useQueryClient, useMutation, useQuery, keepPreviousData } from '@tanstack/react-query'
import { Work } from '@prisma/client'
import { axiosClient } from '@/utils/axios'
import { workKeys } from './queryKeys'
import { LoginBody, AuthData, ListBody, WorkListRes } from '@/types/api/front'
import { workApiUrl } from '@/utils/apiUrl'

/*
  login
*/
export const useMutateLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<AuthData> => {
      const res = await axiosClient.post(`/auth/login`, data)
      return res.data
    },
  })
}

export const useMutationLogout = () => {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      const res = await axiosClient.post(`/auth/logout`, undefined)
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
    placeholderData:keepPreviousData
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
