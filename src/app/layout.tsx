import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

// import NextAuthProvider from '@/provider/NextAuth';
import '@/styles/global.scss'
import { PrimaryHeader } from "@/components/layouts/header/PrimaryHeader";
import { ScrollDown } from "@/components/layouts/decoration/ScrollDown";
import { ArtWork } from "@/artWork/ArtWork";
import { SideLinks } from "@/components/layouts/sideLinks/SideLinks";
import AppProvider from "@/provider/RecoilProvider"

const montserrat = Montserrat({ 
  weight:['300', '500', '700'] , 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: 'minami takanori portfolio',
    template: '%s | minami takanori portfolio',
  },
  description: 'minami takanori portfolio',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/ico.png',
  },

};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={montserrat.variable}>
      <body>
        <PrimaryHeader/>
        <ScrollDown/>
        {/* <NextAuthProvider> */}
        <AppProvider>
          <ArtWork/>
          {children}
          </AppProvider>
        {/* </NextAuthProvider> */}
        <SideLinks/>
        </body>
    </html>
  );
}
