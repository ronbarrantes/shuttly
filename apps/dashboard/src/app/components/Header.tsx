'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export const Header = () => {
  'use client'
  return (
    <header
      style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}
    >
      <h1>My App</h1>
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
