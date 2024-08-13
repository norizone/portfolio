import { authApiUrl } from '@/utils/apiUrl'
import { axiosClient } from '@/utils/axios'

export const logout = async (): Promise<void> => {
  const res = await axiosClient.post(authApiUrl.logout(), undefined)
}

export const getAuth = async (): Promise<{ userId: number }> => {
  const res = await axiosClient.get(authApiUrl.default)
  return res.data
}
