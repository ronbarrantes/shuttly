'use client'

import { Table, createColumnHelper } from './react-table'

import dayjs from 'dayjs'
import { AllRides, DeleteRide } from '@actions/ride'
import { Dialog, DialogV2 } from '@components/Dialog'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

interface DashboardTableProps {
  rides: AllRides[]
  deleteRide: DeleteRide
}

export const DashboardTable = ({ rides, deleteRide }: DashboardTableProps) => {
  const columnHelper = createColumnHelper<AllRides>()
  const [isOpen, setIsOpen] = useState(false)
  const [rideId, setRideId] = useState('')
  const [pending, startTransition] = useTransition()
  const dialogStore = DialogV2.useDialogStore()

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
    columnHelper.accessor('id', {
      header: () => <span>More</span>,
      cell: (info) => {
        // const time = dayjs(info.row.original.scheduledTime).format('h:mma')
        // return info.row.original.id<Dialog>

        return (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                // setIsOpen(true)
                // setRideId(info.row.original.id)
                console.log('====================================')
                console.log('EDITING')
                console.log('====================================')
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsOpen(true)
                setRideId(info.row.original.id)
              }}
            >
              Delete
            </button>
          </div>
        )
      },
    }),
  ]

  return (
    <>
      <Table columns={columns} data={rides} />
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Dialog.Content title="Remove this ride">
          <p>Are you sure you want to delete this ride</p>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn btn-warning"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await deleteRide(rideId)
                    setIsOpen(false)
                    toast.success('Ride deleted')
                  } catch (err: unknown) {
                    if (err instanceof Error) {
                      toast.error(err.message, {
                        position: 'top-center',
                      })
                    }
                  }
                })
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() =>
          dialogStore.handleDialog({
            title: 'HELLO WORLD',
            content: <div>hello</div>,
          })
        }
      >
        Open dialog
      </button>
    </>
  )
}
