import { SignInButton } from '@clerk/nextjs'
import { PageLayout } from '@components/page-layout'

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
