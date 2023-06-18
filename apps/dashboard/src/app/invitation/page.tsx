import { currentUser } from '@clerk/nextjs'
import { prisma } from 'db'

import {
  InvitationCard,
  TestAccountCard,
} from '@components/invitation/InvitationCards'
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
    <PageLayout title="" noMenu>
      <MessageBox title="Welcome">
        <InvitationCard
          userInfo={{
            userId: user!.id,
            companyId: invitation.companyId,
            invitationId: invitation.id,
          }}
        />
      </MessageBox>
    </PageLayout>
  )
}
