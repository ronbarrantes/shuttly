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
}

type TestAccountCardProps = {
  userInfo: Parameters<AcceptTestInvitation>[0]
}

export const InvitationCard = ({ userInfo }: InvitationCardProps) => {
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
          className="rounded bg-indigo-600 px-4 py-2 font-bold text-white disabled:bg-gray-500"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
      </div>
    </div>
  )
}

export const TestAccountCard = ({ userInfo }: TestAccountCardProps) => {
  const [pending, startTransition] = useTransition()

  const handleAcceptTestInvitation = () => {
    startTransition(async () => {
      await acceptTestInvitation({ userId: userInfo.userId })
    })
  }

  return (
    <>
      <p className="text-slate-600">
        If you want to create a test account to look at the platform just click
        the button below
      </p>

      <button
        disabled={pending}
        className="btn-primary"
        onClick={handleAcceptTestInvitation}
      >
        Accept Test Invitation
      </button>
    </>
  )
}
