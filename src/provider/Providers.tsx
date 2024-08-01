import { ReactNode } from 'react'
import { QueryProviders } from './QueryProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryProviders>{children}</QueryProviders>
}
