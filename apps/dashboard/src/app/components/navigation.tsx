import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

type LinkItemsProps = {
  pathname?: string
  links: {
    name: string
    href: string
  }[]
}

const mainNavLinks: LinkItemsProps = {
  pathname: '/',
  links: [
    {
      name: 'Dashboard',
      href: '/',
    },
    {
      name: 'Settings',
      href: '/settings',
    },
  ],
}

const settingsPageLinks: LinkItemsProps = {
  pathname: '/settings',
  links: [],
}

const LinkItems = ({ links, pathname = '/' }: LinkItemsProps) => {
  return (
    <>
      {links.map((link) => (
        <li key={link.name}>
          <Link href={`${pathname}${link.href}`}>{link.name}</Link>
        </li>
      ))}
    </>
  )
}

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
