'use server'

import { prisma } from 'db'
import { clerkClient } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

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

  console.log('testCompanyId', {
    userId,
    companyId,
    invitationId,
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

  // revalidatePath('/invitation')
}

export const createTestAccount = async ({ userId }: { userId: string }) => {
  const testCompanyId = process.env.TEST_COMPANY_ID

  console.log('testCompanyId', testCompanyId)

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
    const [account] = await prisma.$transaction([
      createAccount(),
      // deleteInvitation(),
    ])

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
  } finally {
    // revalidatePath('/invitation')
    // TODO: add a redirect to '/'
    // https://github.com/ronbarrantes/shuttly/issues/38
  }
}

export type AcceptInvitation = typeof acceptInvitation
export type CreateTestAccount = typeof createTestAccount
