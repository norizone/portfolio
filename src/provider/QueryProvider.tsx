'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { useState } from 'react'
import { AuthGuard } from './AuthGard'

export function QueryProviders(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3, //検証用にfalse
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <ReactQueryStreamedHydration>
          {props.children}
        </ReactQueryStreamedHydration>
      </AuthGuard>
    </QueryClientProvider>
  )
}
