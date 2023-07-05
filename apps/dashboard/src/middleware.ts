import { NextResponse } from 'next/server'

import { authMiddleware, clerkClient } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/sign-in'],
  afterAuth: async (auth, req, _evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // once authenticated, checks if user has an account
    // it does this by checking if the user's metadata has been added to clerk
    // this happens during the invitation process
    let usr = null
    if (auth.userId) usr = await clerkClient.users.getUser(auth.userId)

    if (
      auth.userId &&
      !usr?.privateMetadata.companyId &&
      req.nextUrl.pathname !== '/invitation'
    ) {
      const invitation = new URL('/invitation', req.url)
      return NextResponse.redirect(invitation)
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
}
