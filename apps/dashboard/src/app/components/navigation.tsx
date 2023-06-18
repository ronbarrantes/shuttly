import React from 'react'

import Link from 'next/link'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import {
  type LinkItemsProps,
  mainNavLinks,
  settingsPageLinks,
} from '@data/links'

// Tweak this to have the correct return type
const LinkItems = ({ links, pathname }: LinkItemsProps) =>
  links.map((link) => {
    const path = !pathname ? link.href : `${pathname}${link.href}`
    return (
      <li key={link.name}>
        <Link href={path}>{link.name}</Link>
      </li>
    )
  })

export const MainNavigation = () => {
  const { links, pathname } = mainNavLinks

  return (
    <nav>
      <ul className="flex items-center gap-3">
        {links.map((link) => {
          const path = !pathname ? link.href : `${pathname}${link.href}`
          return (
            <li key={link.name}>
              <Link href={path}>{link.name}</Link>
            </li>
          )
        })}
        <li>
          <SigninNavigation />
        </li>
      </ul>
    </nav>
  )
}

export const SettingsPageNav = () => {
  const { links, pathname } = settingsPageLinks
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {links.map((link) => {
          const path = !pathname ? link.href : `${pathname}${link.href}`
          return (
            <li key={link.name}>
              <Link href={path}>{link.name}</Link>
            </li>
          )
        })}
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
