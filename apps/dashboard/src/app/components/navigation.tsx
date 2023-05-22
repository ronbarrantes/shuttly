import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export const MainNavigation = () => {
  return (
    <nav>
      <ul className="flex items-center gap-3 border border-red-500">
        <li>
          <Link href={'/'}>Dashboard</Link>
        </li>
        <li>
          <Link href={'/settings'}>Settings</Link>
        </li>
        <li>
          <SigninNavigation />
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

const SigninNavigation = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}
