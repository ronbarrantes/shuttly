'use client'

import { useEffect, useState } from 'react'
// import { useUser, useAuth, useClerk } from '@clerk/nextjs'

import { Invitation } from 'db'
import { AcceptInvitationFunction, UserInfo } from './page'

type InvitationCardProps = {
  userInfo: UserInfo
  acceptInvitation: AcceptInvitationFunction
}

export const InvitationCard = ({ acceptInvitation }: InvitationCardProps) => {
  const handleAcceptInvitation = async () => {
    const accepted = await acceptInvitation({
      userId: 'userId',
      companyId: 'companyId',
      invitationId: 'invitationId',
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
