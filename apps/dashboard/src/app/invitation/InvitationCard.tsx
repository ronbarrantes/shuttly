'use client'
import { useTransition } from 'react'
import { AcceptInvitationFunction, UserInfo } from './page'

type InvitationCardProps = {
  userInfo: UserInfo
  acceptInvitation: AcceptInvitationFunction
}

export const InvitationCard = ({
  acceptInvitation,
  userInfo,
}: InvitationCardProps) => {
  const [pending, startTransition] = useTransition()

  const handleAcceptInvitation = () => {
    startTransition(async () => {
      await acceptInvitation({
        userId: userInfo.userId,
        companyId: userInfo.companyId,
        invitationId: userInfo.invitationId,
      })
    })
  }

  return (
    <div>
      <p>Invitation</p>
      <div>
        <p>Click the button to accept invitation</p>
        <button
          disabled={pending}
          // type="button"
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white disabled:bg-gray-500"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
      </div>
    </div>
  )
}
