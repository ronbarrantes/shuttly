'use client'

import { UserInfo } from './page'

type AddMetadataCardProps = {
  userId: string
  addMetadata: (userId: string) => Promise<void>
}

export const AddMetadataCard = ({
  userId,
  addMetadata,
}: AddMetadataCardProps) => {
  const handleAddMetadata = async () => {
    if (!userId) return

    await addMetadata(userId)
  }

  return (
    <div>
      <p>Invitation</p>{' '}
      <div>
        <p>Click the button to accept invitation</p>
        <button
          // type="button"
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white"
          onClick={handleAddMetadata}
        >
          Accept Invitation
        </button>
      </div>
      {/* <p>USER ID {invitation?.id}</p> */}
    </div>
  )
}
