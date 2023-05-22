import Link from 'next/link'
import React from 'react'

interface MainNavigationProps {
  noMenu?: boolean
  authNavigation?: React.ReactNode
}

export const MainNavigation = ({
  noMenu,
  authNavigation,
}: MainNavigationProps) => {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <Link href={'/'}>Dashboard</Link>
        </li>
        <li>
          <Link href={'/settings'}>Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

export const SideNavigation = () => {
  const uri = '/settings'

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <Link href={`${uri}/`}>Personal</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Company</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li>
      </ul>
    </nav>
  )
}
