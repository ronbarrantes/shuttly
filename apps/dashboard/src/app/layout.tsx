import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

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
        <body>
          {children}
          <Toaster position="bottom-left" />
        </body>
      </html>
    </ClerkProvider>
  )
}
