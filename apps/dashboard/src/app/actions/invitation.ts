'use server'

import { prisma } from 'db'
import { clerkClient } from '@clerk/nextjs'

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

export const getInvitation = async (email?: string) => {
  'use server'

  const invitation = await prisma.invitation.findFirst({
    where: {
      email,
    },
  })
  return invitation
}

export const acceptInvitation: AcceptInvitationFunction = async ({
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

  try {
    const [account, _invitation] = await prisma.$transaction([
      createAccount(),
      deleteInvitation(),
    ])

    await clerkClient.users.updateUserMetadata(userId, {
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
  } finally {
    // revalidatePath('/invitation')
    // TODO: add a redirect to '/'
    // https://github.com/ronbarrantes/shuttly/issues/38
  }
}
