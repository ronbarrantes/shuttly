import { InvitationCard } from './InvitationCard'

import {} from 'react'

import { auth, currentUser } from '@clerk/nextjs'

import { prisma } from 'db'
import { UserInfo } from './userInfo'

const acceptInvitation = async () => {}

// const getAccount = async (userId: string | null) => {
//   if (!userId) {
//     return null
//   }

//   const account = await prisma.account.findUnique({
//     where: {
//       userId,
//     },
//   })
//   return account
// }

const getInvitation = async (email?: string) => {
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

export default async function Invitation() {
  const { user, userId, actor, debug, getToken, orgId } = auth()

  const authInfo = auth()

  console.log('USER ===========>>>', authInfo)

  console.log(user?.emailAddresses)

  const invitation = await getInvitation(user?.emailAddresses[0].emailAddress)

  if (!invitation) {
    return (
      <div>
        <p>{`You ain't got an invitation yet`}</p>
        <p>{userId}</p>
        <UserInfo user={'stuff'} />
      </div>
    )
  }

  return (
    <div>
      <p>Welcome</p>
      {/* <InvitationCard /> */}
    </div>
  )
}
