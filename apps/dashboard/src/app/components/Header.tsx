'use client'

import Link from 'next/link'

type HeaderProps = {
  children?: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  'use client'
  return (
    <header className="flex items-center justify-between border border-green-500 py-2">
      <Link href="/">
        <h1 className="text-2xl">Shuttly</h1>
      </Link>
      {children}
    </header>
  )
}
