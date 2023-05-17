import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'
// include styles from the ui package
import 'ui/styles.css'
import { Footer } from './components/footer'
import { Header } from './components/header'

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

// const PageLayout = (

// <div className="flex flex-col w-screen h-screen p-5 border border-red-500">
// {/* <Header noMenu={props.noMenu} /> */}
// <main className="flex flex-col border border-green-500 grow">
//   <h1 className="overflow-y-scroll text-2xl font-semibold">
//     {props.title}
//   </h1>
//   {props.children}
// </main>
// {/* <Footer /> */}
// </div>
// )
