import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  afterAuth: async (auth, req, _evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    console.log('METADATA ====>>', auth.user?.privateMetadata)

    // console.log('FROM MIDDLEWARE ===', auth.userId)

    // let companyId = null

    // if (auth.userId) {
    //   companyId =
    //     await prisma.$executeRaw`SELECT id FROM Account WHERE "userId" = ${auth.userId}`
    // }

    // console.log('FROM MIDDLEWARE ===', companyId)

    // let userId = null

    // handle users who aren't in an organization
    // rededirect them to organization selection page
    if (!auth.orgId && req.nextUrl.pathname !== '/invitation') {
      const orgSelection = new URL('/invitation', req.url)
      return NextResponse.redirect(orgSelection)
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
