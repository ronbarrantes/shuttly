'use client'

export const UserInfo = ({ user }: { user: any }) => {
  // console.log('INFO -------->>', JSON.stringify(user))

  if (!user) {
    return (
      <div>
        <p>No User</p>
      </div>
    )
  }

  return (
    <div>
      <p>USER INFO</p>
    </div>
  )
}
