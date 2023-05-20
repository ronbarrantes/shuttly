import { InvitationCard } from './InvitationCard'

import {} from 'react'

import { auth, currentUser } from '@clerk/nextjs'

import { prisma } from 'db'
import { UserInfo } from './userInfo'

const acceptInvitation = async () => {}

export default async function Invitation() {
  const getInvitation = async (email?: string) => {
    'use server'
    if (!email) {
      return null
    }

    const invitation = await prisma.invitation.findFirst({
      where: {
        email,
      },
    })
    return invitation
  }

  return (
    <div>
      <p>Welcome</p>
      <InvitationCard getInvitation={getInvitation} />
    </div>
  )
}
