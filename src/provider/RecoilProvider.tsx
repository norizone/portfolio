'use client'

import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { QueryProviders } from './QueryProvider'

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProviders>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryProviders>
  )
}
