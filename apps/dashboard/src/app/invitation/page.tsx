import { prisma } from 'db'
import { useUser } from '@clerk/nextjs'

const getInvitation = async () => {
  const invitation = await prisma.invitation.findUnique({
    where: {},
  })
}

const acceptInvitation = async () => {}

export default function Invitation() {
  return <div></div>
}
