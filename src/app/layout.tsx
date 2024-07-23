import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import '@/styles/global.scss'
import { PrimaryHeader } from '@/components/layouts/header/PrimaryHeader'
import { ScrollDown } from '@/components/layouts/decoration/ScrollDown'
import { ArtWork } from '@/artWork/ArtWork'
import { SideLinks } from '@/components/layouts/sideLinks/SideLinks'
import { Providers } from '@/provider/Providers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const montserrat = Montserrat({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'minami takanori portfolio',
    template: '%s | minami takanori portfolio',
  },
  description: 'minami takanori portfolio',
  icons: {
    icon: '/ico.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={montserrat.variable}>
      <body>
        <PrimaryHeader />
        <ScrollDown />
        <Providers>
          <ArtWork />
          {children}
          <ReactQueryDevtools />
        </Providers>
        <SideLinks />
      </body>
    </html>
  )
}
