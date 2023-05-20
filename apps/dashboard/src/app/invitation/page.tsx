import { InvitationCard } from './InvitationCard'

import {} from 'react'

import { auth, currentUser, withUser } from '@clerk/nextjs'

import { prisma } from 'db'

export type UserInfo = {
  userId: string
  companyId: string
  invitationId: string
}

export type AcceptInvitationFunction = ({
  userId,
  companyId,
  invitationId,
}: UserInfo) => Promise<void>

// Promise<{
//   accountId: string
//   companyId: string
//   companyName: string
// }>

export default async function Invitation() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress

  const getInvitation = async (email?: string) => {
    'use server'

    const invitation = await prisma.invitation.findFirst({
      where: {
        email,
      },
    })
    return invitation
  }

  const acceptInvitation: AcceptInvitationFunction = async ({
    userId,
    companyId,
    invitationId,
  }) => {
    'use server'

    const createAccount = () =>
      prisma.account.create({
        data: {
          userId: userId,
          company: {
            connect: {
              id: companyId,
            },
          },
        },

        include: {
          company: true,
        },
      })

    const deleteInvitation = () =>
      prisma.invitation.delete({
        where: {
          id: invitationId,
        },
      })

    console.log('EMAIL', userEmail)

    // try {
    //   const [account] = await prisma.$transaction([
    //     createAccount(),
    //     deleteInvitation(),
    //   ])

    //   return {
    //     accountId: account.id,
    //     companyId: account.companyId,
    //     companyName: account.company.name,
    //   }
    // } catch (error) {
    //   throw new Error('Something went wrong')
    // }
  }

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
