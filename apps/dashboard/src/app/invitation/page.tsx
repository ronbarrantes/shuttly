import { InvitationCard } from './InvitationCard'
import { currentUser } from '@clerk/nextjs'
import { getInvitation, acceptInvitation } from '@actions/invitation'

export default async function Invitation() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress

  const invitation = await getInvitation()

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
