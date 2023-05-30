'use server'

import { prisma } from 'db'
import { clerkClient } from '@clerk/nextjs'

export const acceptInvitation = async ({
  userId,
  companyId,
  invitationId,
}: {
  userId: string
  companyId: string
  invitationId: string
}) => {
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

export type AcceptInvitation = typeof acceptInvitation
