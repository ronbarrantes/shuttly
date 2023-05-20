import { InvitationCard } from './InvitationCard'

import {} from 'react'

import { auth, currentUser, withUser, clerkClient } from '@clerk/nextjs'

import { prisma } from 'db'
import { AddMetadataCard } from './AddMetadata'

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

export default async function Invitation() {
  // const { userId } = auth()
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

  const getAccount = async (userId: string) => {
    'use server'

    const account = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    })

    return account
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

    console.log('EMAIL', userId)
    console.log('COMPANY', companyId)
    console.log('INVITATION', invitationId)

    try {
      const [account, _invitation] = await prisma.$transaction([
        createAccount(),
        deleteInvitation(),
      ])

      await clerkClient.users.updateUserMetadata(user!.id, {
        publicMetadata: {
          companyName: account.company.name,
          accountId: account.id,
        },
        privateMetadata: {
          companyId: account.companyId,
        },
      })
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  const invitation = await getInvitation()
  const currentAccount = await getAccount(user!.id)

  const addMetadata = async (userId: string) => {
    'use server'

    // const currentAccount = await prisma.account.findUnique({
    //   where: {
    //     userId: userId,
    //   },
    //   include: {
    //     company: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //   },
    // })

    if (!currentAccount) return

    // console.log('CURRENT ACCOUNT', currentAccount)

    const account = currentAccount

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        companyName: account.company.name,
        accountId: account.id,
      },
      privateMetadata: {
        companyId: account.companyId,
      },
    })
  }

  console.log('INVITATION', user?.publicMetadata)

  if (currentAccount) {
    // addMetadata(user!.id)
    return (
      <div>
        <p>Welcome</p>
        <p>{userEmail}</p>
        <p></p>
        <AddMetadataCard userId={user!.id} addMetadata={addMetadata} />
      </div>
    )
  }

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
      {/* <p></p> */}
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
