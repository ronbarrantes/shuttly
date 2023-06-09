'use client'
import { useTransition } from 'react'
import {
  type AcceptInvitation,
  type CreateTestAccount,
  acceptInvitation,
  createTestAccount,
} from '@actions/invitation'

type InvitationCardProps = {
  userInfo: Parameters<AcceptInvitation>[0]
}

type TestAccountCardProps = {
  userInfo: Parameters<CreateTestAccount>[0]
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

  const handleCreateTestAccount = () => {
    startTransition(async () => {
      await createTestAccount({ userId: userInfo.userId })
    })
  }

  return (
    <>
      <p className="text-slate-500">
        If you want to create a test account to look at the platform just click
        the button below
      </p>

      <button
        disabled={pending}
        className="btn-primary"
        onClick={handleCreateTestAccount}
      >
        Create Test Account
      </button>
    </>
  )
}
