import { InvitationCard, TestAccountCard } from './InvitationCards'
import { currentUser } from '@clerk/nextjs'

import { prisma } from 'db'
import { PageLayout } from '@components/page-layout'

export default async function Invitation() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress

  const invitation = await prisma.invitation.findFirst({
    where: { email: userEmail },
  })

  if (!invitation) {
    return (
      <PageLayout title="" noMenu>
        <div className="flex justify-center p-5 align-middle">
          <div className="text mt-12 flex w-1/2 max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 p-8 shadow-sm shadow-slate-200">
            <h2 className="text-center text-2xl font-semibold">Welcome</h2>
            <p>
              {`It looks like you don't have an invitation yet. Please contact your company's admin to get one.`}
            </p>
            <p>
              If you want to create a test account to look at the platform just
              click the button below
            </p>
            <TestAccountCard
              userInfo={{
                userId: user!.id,
              }}
              // acceptTestInvitation={acceptTestInvitation}
            />
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Welcome" noMenu>
      <p>{userEmail}</p>
      <InvitationCard
        userInfo={{
          userId: user!.id,
          companyId: invitation.companyId,
          invitationId: invitation.id,
        }}
        // acceptInvitation={acceptInvitation}
      />
    </PageLayout>
  )
}
