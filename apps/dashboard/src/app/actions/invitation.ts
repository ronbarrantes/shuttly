'use server'

import { clerkClient } from '@clerk/nextjs'
import { prisma } from 'db'

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
  }
}

export const createTestAccount = async ({ userId }: { userId: string }) => {
  const testCompanyId = process.env.TEST_COMPANY_ID
  const createAccount = () =>
    prisma.account.create({
      data: {
        userId: userId,
        company: {
          connect: {
            id: testCompanyId,
          },
        },
      },

      include: {
        company: true,
      },
    })

  try {
    const [account] = await prisma.$transaction([createAccount()])

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        companyName: account.company.name,
        accountId: account.id,
      },
      privateMetadata: {
        companyId: account.companyId,
        testAccount: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export type AcceptInvitation = typeof acceptInvitation
export type CreateTestAccount = typeof createTestAccount
