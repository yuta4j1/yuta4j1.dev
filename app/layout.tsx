import '../styles/globals.css'
import { Metadata } from 'next'
import classNames from 'classnames'
import Header from './_components/Header'
import Footer from './_components/Footer'

export const metadata: Metadata = {
  title: 'yuta4j1.dev',
  description: 'yuta4j1 develop blog',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

// TODO: next-seo
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <meta charSet="UTF-8" />
      <link
        href="https://fonts.googleapis.com/css?family=M+PLUS+1p&display=swap"
        rel="stylesheet"
      ></link>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
