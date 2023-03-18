import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
