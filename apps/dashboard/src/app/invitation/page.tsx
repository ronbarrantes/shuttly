import { InvitationCard } from './InvitationCard'
import { prisma } from 'db'
import { currentUser, clerkClient } from '@clerk/nextjs'

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
