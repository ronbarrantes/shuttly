'use client'

type HeaderProps = {
  children?: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  'use client'
  return (
    <header className="flex items-center justify-between border border-green-500 p-5 py-2">
      <h1 className="text-2xl">Shuttly</h1>
      {children}
    </header>
  )
}
