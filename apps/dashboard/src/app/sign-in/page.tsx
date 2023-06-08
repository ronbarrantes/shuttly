import { SignInButton } from '@clerk/nextjs'
import { PageLayout } from '@components/page-layout'

// TODO: come up with a solution so that the app can be used without being part of a company
// maybe create a temporary fake company in order to be part of

const SignInPage = () => {
  return (
    <PageLayout title="" noMenu>
      <div className="flex justify-center p-5 align-middle">
        <div className="text flex w-80 flex-col items-center gap-3 rounded-lg border border-slate-200 p-8 shadow-sm shadow-slate-200">
          <p className="text-center text-xl font-semibold">
            To continue with the platform please sign in
          </p>
          <p className="text-sm text-slate-500">
            If you don&apos;t already have an account, one will be created for
            you automatically. Rest assured, your account will be managed by{' '}
            <a
              href="https://clerk.com/"
              target="_blank"
              rel="noopener"
              className="text-blue-500 underline hover:text-black hover:no-underline"
            >
              Clerk.com
            </a>
            , using Google OAuth to ensure the security of your information.
          </p>
          <SignInButton mode="modal">
            <button className="btn-primary">Sign In</button>
          </SignInButton>
        </div>
      </div>
    </PageLayout>
  )
}

export default SignInPage
