'use client'

import type { Ride, Passenger } from 'db'
import { Button, Card, Table, createColumnHelper } from 'ui'
import { InferredRide } from '../page'
import dayjs from 'dayjs'

interface DashboardTableProps {
  rides: InferredRide[]
}

export const DashboardTable = ({ rides }: DashboardTableProps) => {
  const columnHelper = createColumnHelper<InferredRide>()

  // What do I wanna display

  // passenger name
  // passenger address
  // time
  // ride type
  // ride status
  // has driver

  console.log('RIDES', rides)

  const columns = [
    columnHelper.accessor('passenger.name', {
      header: () => <span>Passenger</span>,
      cell: (info) => {
        return `${info.row.original.passenger.name}`
      },
    }),

    // columnHelper.accessor('passenger.name', {
    //   cell: (info) => info.getValue(),
    // }),
    // columnHelper.accessor('passenger.', {
    //   header: () => <span>Ride Type</span>,
    //   cell: (info) => {
    //     return `${info.row.original.rideType}`
    //   },
    // }),
    columnHelper.accessor('passenger.address', {
      header: () => <span>Address</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('scheduledTime', {
      header: () => <span>Scheduled Time</span>,
      cell: (info) => {
        const time = dayjs(info.row.original.scheduledTime).format('h:mma')
        return time
      },
    }),
  ]

  return (
    <>
      <Table columns={columns} data={rides} />
    </>
  )
}
