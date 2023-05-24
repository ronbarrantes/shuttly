'use client'

import type { Ride, Passenger } from 'db'
import { Button, Card } from 'ui'

import { Table, createColumnHelper } from './react-table'

import dayjs from 'dayjs'
import { AllRides } from '@actions/ride'

interface DashboardTableProps {
  rides: AllRides[]
}

export const DashboardTable = ({ rides }: DashboardTableProps) => {
  const columnHelper = createColumnHelper<AllRides>()

  // What do I wanna display
  // passenger name
  // passenger address
  // time
  // ride type
  // ride status
  // has driver

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
