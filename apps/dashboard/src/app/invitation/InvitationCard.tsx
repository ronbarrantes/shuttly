'use client'

// import { useUser, useAuth, useClerk } from '@clerk/nextjs'

import { AcceptInvitationFunction, UserInfo } from './page'

type InvitationCardProps = {
  userInfo: UserInfo
  acceptInvitation: AcceptInvitationFunction
}

export const InvitationCard = ({
  acceptInvitation,
  userInfo,
}: InvitationCardProps) => {
  const handleAcceptInvitation = async () => {
    await acceptInvitation({
      userId: userInfo.userId,
      companyId: userInfo.companyId,
      invitationId: userInfo.invitationId,
    })
  }

  return (
    <div>
      <p>Invitation</p>{' '}
      <div>
        <p>Click the button to accept invitation</p>
        <button
          // type="button"
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
      </div>
      {/* <p>USER ID {invitation?.id}</p> */}
    </div>
  )
}
