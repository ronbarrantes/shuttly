import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shuttly.app',
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-6xl font-extrabold tracking-tight text-center text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="block px-2 text-transparent bg-gradient-to-r from-brandred to-brandblue bg-clip-text">
            Shuttly
          </span>
        </h1>
      </main>
    </div>
  )
}
