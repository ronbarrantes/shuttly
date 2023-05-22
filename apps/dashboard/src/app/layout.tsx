import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'
import 'ui/styles.css'
import { Footer } from './components/footer'
import { Header } from './components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex h-screen w-screen flex-col border border-red-500 p-5">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
