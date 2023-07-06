import '../styles/globals.css'
import { Metadata } from 'next'
import Header from './_components/Header'
import Footer from './_components/Footer'
import { M_PLUS_1p } from 'next/font/google'

const mPlus1p = M_PLUS_1p({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'yuta4j1.dev',
  description: 'yuta4j1 develop blog',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

// TODO: next-seo
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={mPlus1p.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
