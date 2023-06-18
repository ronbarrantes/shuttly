'use client'

import { Table, createColumnHelper } from './react-table'

import dayjs from 'dayjs'
import { AllRides, DeleteRide, EditRide, ZodEditRide } from '@actions/ride'
import { DialogV2 } from '@components/Dialog'
import { useTransition } from 'react'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Switch } from '@components/Switch'

interface DashboardTableProps {
  rides: AllRides[]
  deleteRide: DeleteRide
  editRide: EditRide
}

export const DashboardTable = ({
  rides,

  deleteRide,
  editRide,
}: DashboardTableProps) => {
  const columnHelper = createColumnHelper<AllRides>()
  const [pending, startTransition] = useTransition()
  const dialogStore = DialogV2.useDialogStore()

  const { register, reset, handleSubmit, setValue, control } =
    useForm<ZodEditRide>()

  const onSubmit = (data: ZodEditRide) => {
    startTransition(async () => {
      try {
        await editRide(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message, {
            position: 'top-center',
          })
        }
      }

      reset()
      dialogStore.handleDialogClose()
    })
  }

  const handleEditRide = (rideId: string, rideName: string) => {
    setValue('id', rideId)
    dialogStore.handleDialog({
      title: 'Edit ride',
      content: (
        <>
          <p>{`Editing ${rideName}'s ride`}</p>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <input
                {...register('altAddress')}
                placeholder="Alternate Address"
                className="px-2 py-1 border rounded-md border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              />
              <Controller
                name={'useAltAddress'}
                render={({ field }) => {
                  return (
                    <Switch
                      useLabel
                      label="Use Alt address"
                      checked={field.value}
                      onCheckedChange={(val: boolean) =>
                        setValue('useAltAddress', val)
                      }
                      {...register(field.name)}
                    />
                  )
                }}
                control={control}
              />
            </div>
            {/* <input
              className="px-2 py-1 border rounded-md border-slate-500"
              placeholder="Phone Number"
              {...register('phone', { required: true })}
            /> */}

            <input
              type="datetime-local"
              // defaultValue={dayjs(watch('scheduledTime')).format(
              //   'YYYY-MM-DDThh:mm'
              // )}
              // value={dayjs(watch('scheduledTime')).format('YYYY-MM-DDThh:mm')}
              className="px-2 py-1 border rounded-md h-fit w-fit border-slate-500"
              placeholder="Date"
              // defaultValue={dateValue}
              max={dayjs().add(2, 'weeks').format('YYYY-MM-DDThh:mm')}
              min={dayjs().format('YYYY-MM-DDThh:mm')}
              {...register('scheduledTime')}
            />

            {
              /// allow to change drivers or something like that
            }

            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={pending}
              >
                OK
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  dialogStore.handleDialogClose()
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ),
    })
  }
  const handleDeleteRide = (rideId: string) => {
    dialogStore.handleDialog({
      title: 'Delete ride',
      content: (
        <>
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
                    toast.success('Ride deleted')
                  } catch (err: unknown) {
                    if (err instanceof Error) {
                      toast.error(err.message, {
                        position: 'top-center',
                      })
                    }
                  } finally {
                    dialogStore.handleDialogClose()
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
                reset()
                dialogStore.handleDialogClose()
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ),
    })
  }

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

      cell: (info) => {
        // info.getValue()
        const address =
          info.row.original.altAddress?.length &&
          info.row.original.useAltAddress
            ? info.row.original.altAddress
            : info.getValue()
        return address
      },
    }),
    columnHelper.accessor('scheduledTime', {
      header: () => <span>Scheduled Time</span>,
      cell: (info) => {
        const time = dayjs(info.row.original.scheduledTime).format(
          'MMM DD [at] h:mma'
        )
        return time
      },
    }),
    columnHelper.accessor('id', {
      header: () => <span>More</span>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setValue('useAltAddress', info.row.original.useAltAddress)
                setValue('altAddress', info.row.original?.altAddress || '')
                setValue(
                  'scheduledTime',
                  dayjs(info.row.original.scheduledTime).format(
                    'YYYY-MM-DDThh:mm'
                  )
                )
                handleEditRide(
                  info.row.original.id,
                  info.row.original.passenger.name
                )
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleDeleteRide(info.row.original.id)}
            >
              Delete
            </button>
          </div>
        )
      },
    }),
  ]

  // watch input value by passing the name of it

  return <Table columns={columns} data={rides} />
}
