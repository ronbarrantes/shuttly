import { useState } from 'react'
import { Button } from 'ui'

export default function Web() {
  const [state, setState] = useState<string>()

  const text = state ?? 'WEB'

  return (
    <div>
      <h1>{text}</h1>
      <Button onClick={() => setState('HELLO RON')} />
    </div>
  )
}
