import * as React from 'react'

interface ButtonProps {
  onClick?: () => void
}

export const Button = ({ onClick }: ButtonProps) => {
  const handleClick = () => {
    console.log('click')
  }

  return <button onClick={onClick || handleClick}>Boop</button>
}
