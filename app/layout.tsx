import '../styles/globals.css'
import { Metadata } from 'next'
import Header from './_components/Header'
import Footer from './_components/Footer'
import classNames from 'classnames'
import { Noto_Sans_JP } from 'next/font/google'

const defaultFont = Noto_Sans_JP({
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
    <html lang="ja" className={defaultFont.className}>
      <body className={classNames('flex', 'flex-col', 'h-screen')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
