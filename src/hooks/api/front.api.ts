export const workApis = {
  deflate: 'work' as const,
  list: () => `${workApis.deflate}/list`,
  detail: (id: number) => `${workApis.deflate}/detail/${id}`,
}

export const authApis = {
  deflate: 'auth' as const,
  login: () => `${authApis.deflate}/login`,
  logout: () => `${authApis.deflate}/logout`,
}
