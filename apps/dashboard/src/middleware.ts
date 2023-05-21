import { authMiddleware, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/sign-in'],
  afterAuth: async (auth, req, _evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    let usr = null
    if (auth.userId)
      usr = auth.userId && (await clerkClient.users.getUser(auth.userId))

    if (
      auth.userId &&
      !usr?.privateMetadata.companyId &&
      req.nextUrl.pathname !== '/invitation'
    ) {
      const invitation = new URL('/invitation', req.url)
      return NextResponse.redirect(invitation)
    }

    if (
      usr?.privateMetadata.companyId &&
      req.nextUrl.pathname === '/invitation'
    ) {
      const dashboard = new URL('/', req.url)
      return NextResponse.redirect(dashboard)
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
}
