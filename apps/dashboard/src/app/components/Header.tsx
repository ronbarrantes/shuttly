'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export const Header = () => {
  'use client'
  return (
    <header
      className="flex items-center justify-between border border-green-500 p-5 py-2"
      //style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}
    >
      <h1 className="text-2xl">Shuttly</h1>

      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  )
}
