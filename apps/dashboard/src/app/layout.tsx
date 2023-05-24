import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'
import 'ui/styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: check if this is necessary
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
