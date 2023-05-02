import '../styles/globals.css'
import { Metadata } from 'next'
import classNames from 'classnames'
import Header from './_components/Header'
import Footer from './_components/Footer'

export const metadata: Metadata = {
  title: 'yuta4j1.dev',
  description: 'yuta4j1 develop blog',
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={classNames("font-sans")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
