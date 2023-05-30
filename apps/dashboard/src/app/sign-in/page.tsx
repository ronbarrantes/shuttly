import { SignInButton } from '@clerk/nextjs'
import { PageLayout } from '@components/page-layout'

// TODO: come up with a solution so that the app can be used without being part of a company
// maybe create a temporary fake company in order to be part of

const SignInPage = () => {
  return (
    <PageLayout title="" noMenu>
      <div>
        <SignInButton />
      </div>
    </PageLayout>
  )
}

export default SignInPage
