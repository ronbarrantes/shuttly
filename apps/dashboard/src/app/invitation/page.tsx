import { InvitationCard } from './InvitationCard'
import { currentUser } from '@clerk/nextjs'
import { acceptInvitation } from '@actions/invitation'
import { prisma } from 'db'

export default async function Invitation() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress

  const invitation = await prisma.invitation.findFirst({
    where: { email: userEmail },
  })

  if (!invitation)
    return (
      <div>
        <p>Welcome</p>
        <p>No invitation found</p>
      </div>
    )

  return (
    <div>
      <p>Welcome</p>
      <p>{userEmail}</p>
      <InvitationCard
        userInfo={{
          userId: user!.id,
          companyId: invitation.companyId,
          invitationId: invitation.id,
        }}
        acceptInvitation={acceptInvitation}
      />
    </div>
  )
}
