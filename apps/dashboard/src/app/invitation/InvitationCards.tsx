'use client'
import { useTransition } from 'react'
import {
  type AcceptInvitation,
  type AcceptTestInvitation,
  acceptInvitation,
  acceptTestInvitation,
} from '@actions/invitation'

type InvitationCardProps = {
  userInfo: Parameters<AcceptInvitation>[0]
  // acceptInvitation: AcceptInvitation
}

type TestAccountCardProps = {
  userInfo: Parameters<AcceptTestInvitation>[0]
  // acceptTestInvitation: AcceptTestInvitation
}

export const InvitationCard = ({
  // acceptInvitation,
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
          className="rounded bg-indigo-600 px-4 py-2 font-bold text-white disabled:bg-gray-500"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
      </div>
    </div>
  )
}

export const TestAccountCard = ({
  // acceptTestInvitation,
  userInfo,
}: TestAccountCardProps) => {
  const [pending, startTransition] = useTransition()

  const handleAcceptTestInvitation = () => {
    startTransition(async () => {
      await acceptTestInvitation({ userId: userInfo.userId })
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
          className="rounded bg-indigo-600 px-4 py-2 font-bold text-white disabled:bg-gray-500"
          onClick={handleAcceptTestInvitation}
        >
          Accept Invitation
        </button>
      </div>
    </div>
  )
}
