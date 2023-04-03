import { Button } from 'ui'

export default function Docs() {
  const handleClick = () => {
    alert('FRIGGING ALERT')
  }

  return (
    <div>
      <h1>Docs</h1>
      <Button onClick={handleClick} />
    </div>
  )
}
