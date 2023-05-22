import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import {
  type LinkItemsProps,
  mainNavLinks,
  settingsPageLinks,
} from '@data/links'

const LinkItems = ({ links, pathname }: LinkItemsProps) => (
  <>
    {links.map((link) => {
      const path = !pathname ? link.href : `${pathname}${link.href}`
      return (
        <li key={link.name}>
          <Link href={path}>{link.name}</Link>
        </li>
      )
    })}
  </>
)

export const MainNavigation = () => {
  return (
    <nav>
      <ul className="flex items-center gap-3 border border-red-500">
        <LinkItems {...mainNavLinks} />
        <li>
          <SigninNavigation />
        </li>
      </ul>
    </nav>
  )
}

export const SettingsPageNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <LinkItems {...settingsPageLinks} />
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
