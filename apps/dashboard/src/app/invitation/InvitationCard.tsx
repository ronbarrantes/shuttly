'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { Invitation } from 'db'

type InvitationCardProps = {
  userId?: string
  getInvitation: (email: string) => Promise<Invitation | null>
}

export const InvitationCard = ({ getInvitation }: InvitationCardProps) => {
  const { user } = useUser()

  console.log('USER', user?.emailAddresses[0].emailAddress)

  const [invitation, setInvitation] = useState<Invitation | null>(null)

  useEffect(() => {
    const fetchInvitation = async () => {
      if (!user?.emailAddresses[0].emailAddress) {
        return null
      }

      const invitation = await getInvitation(
        user?.emailAddresses[0].emailAddress
      )
      setInvitation(invitation)
    }
    fetchInvitation()
  }, [getInvitation, user?.emailAddresses])

  return (
    <div>
      <p>USER ID {invitation?.id}</p>
    </div>
  )
}
