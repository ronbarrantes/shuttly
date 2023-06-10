'use client'
import { useTransition } from 'react'
import {
  type AcceptInvitation,
  type CreateTestAccount,
  acceptInvitation,
  createTestAccount,
} from '@actions/invitation'
import { useRouter } from 'next/navigation'

type InvitationCardProps = {
  userInfo: Parameters<AcceptInvitation>[0]
}

type TestAccountCardProps = {
  userInfo: Parameters<CreateTestAccount>[0]
}

export const InvitationCard = ({ userInfo }: InvitationCardProps) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleAcceptInvitation = () => {
    startTransition(async () => {
      await acceptInvitation({
        userId: userInfo.userId,
        companyId: userInfo.companyId,
        invitationId: userInfo.invitationId,
      })

      router.push('/')
    })
  }

  return (
    <>
      <p>Looks like your invitation has been approved.</p>
      <p>Please click the button to accept the invitation.</p>
      <button
        disabled={pending}
        className="btn-primary"
        onClick={handleAcceptInvitation}
      >
        Accept Invitation
      </button>
    </>
  )
}

export const TestAccountCard = ({ userInfo }: TestAccountCardProps) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreateTestAccount = () => {
    startTransition(async () => {
      await createTestAccount({ userId: userInfo.userId })
      router.push('/')
    })
  }

  return (
    <>
      <p>
        {`It looks like you don't have an invitation yet. Please contact your company's admin to get one.`}
      </p>
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
