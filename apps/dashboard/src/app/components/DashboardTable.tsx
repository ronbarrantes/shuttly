'use client'

import { type Passenger } from 'db'
import { Button, Card, Table, createColumnHelper } from 'ui'

interface DashboardTableProps {
  passengers: Passenger[]
}

export const DashboardTable = ({ passengers }: DashboardTableProps) => {
  'use client'

  const {} = createColumnHelper()

  return <h1>Hello</h1>
}
