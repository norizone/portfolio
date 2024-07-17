export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/front`

export const workApiUrl = {
  default: '/work',
  list: () => `${workApiUrl.default}/list`,
  detail: (id: number) => `${workApiUrl.default}/detail/${id}`,
}

export const authApiUrl = {
  default: '/auth',
  login: () => `${authApiUrl.default}/login`,
  logout: () => `${authApiUrl.default}/logout`,
}
