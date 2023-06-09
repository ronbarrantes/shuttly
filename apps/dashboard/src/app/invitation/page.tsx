import {
  InvitationCard,
  TestAccountCard,
} from '@components/invitation/InvitationCards'
import { currentUser } from '@clerk/nextjs'

import { prisma } from 'db'
import { PageLayout } from '@components/page-layout'
import { MessageBox } from '../components/invitation/MessageBox'

export default async function Invitation() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress

  const invitation = await prisma.invitation.findFirst({
    where: { email: userEmail },
  })

  if (!invitation) {
    return (
      <PageLayout title="" noMenu>
        <MessageBox title="Welcome">
          <p>
            {`It looks like you don't have an invitation yet. Please contact your company's admin to get one.`}
          </p>

          <TestAccountCard
            userInfo={{
              userId: user!.id,
            }}
          />
        </MessageBox>
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
      />
    </PageLayout>
  )
}
