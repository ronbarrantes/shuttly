import { authMiddleware, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/sign-in'],
  afterAuth: async (auth, req, _evt) => {
    // handle users who aren't authenticated

    console.log('### Not signed in ###')

    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)

      console.log('### Redirect to sign in ###')
      return NextResponse.redirect(signInUrl)
    }

    // once authenticated, checks if user has an account
    // it does this by checking if the user's metadata has been added to clerk
    // this happens during the invitation process

    console.log('### User check ###')

    let usr = null
    if (auth.userId) usr = await clerkClient.users.getUser(auth.userId)

    console.log('USR ====>>', usr?.id)

    console.log('### Signed in Check, but not assigned ###')
    if (
      auth.userId &&
      !usr?.privateMetadata.companyId &&
      req.nextUrl.pathname !== '/invitation'
    ) {
      const invitation = new URL('/invitation', req.url)
      return NextResponse.redirect(invitation)
    }

    console.log('### Redirect to dashboard ###')

    // console.log('### Redirect to dashboard ###')
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
}
