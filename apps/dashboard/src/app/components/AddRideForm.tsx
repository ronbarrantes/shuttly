'use client'
import { useState, useTransition } from 'react'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { type AddPassenger, type AddRide, ZodRideType } from '@actions/ride'
import { Dialog } from '@components/Dialog'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useKeepCount } from '@hooks'
import toast from 'react-hot-toast'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
  companyId: string
}

export const AddRideForm = ({
  addPassenger,
  addRide,
  companyId,
}: AddRideFormProps) => {
  const [pending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const {
    count: rideCount,
    increment,
    remove,
    reset: resetCount,
  } = useKeepCount()

  const hiCountBound = rideCount.length >= 4
  const loCountBound = rideCount.length <= 1

  const {
    watch, // REMOVE LATER
    register,
    reset,
    handleSubmit,
    formState: { errors }, // REMOVE LATER
  } = useForm<ZodRideType>()

  const onSubmit = (data: ZodRideType) => {
    startTransition(async () => {
      const rides = rideCount.map((rideIdx) => data.rides[rideIdx])
      data = { ...data, companyId, rides }
      try {
        await addRide(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message, {
            position: 'top-center',
          })
        }
      }

      reset()
      resetCount()
      setIsOpen(false)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <Dialog.Trigger className="btn btn-primary">Add a Ride</Dialog.Trigger>
      <Dialog.Content title="Add a ride">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className={classNames(
              'rounded-md border border-slate-500 px-2 py-1'
            )}
          />
          <input
            {...register('address', { required: true })}
            placeholder="Address"
            className="rounded-md border border-slate-500 px-2 py-1"
          />
          <input
            className="rounded-md border border-slate-500 px-2 py-1"
            placeholder="Phone Number"
            {...register('phone', { required: true })}
          />
          <hr />{' '}
          {rideCount.map((rideIdx, idx) => {
            return (
              <div
                key={`${rideIdx}-${idx}`}
                className="flex flex-col gap-3 border-b border-slate-200 py-3"
              >
                <div className="relative flex items-center justify-between">
                  <input
                    type="datetime-local"
                    className="h-fit w-fit rounded-md border border-slate-500 px-2 py-1"
                    placeholder="Date"
                    max={dayjs().add(2, 'month').format('YYYY-MM-DDThh:mm')}
                    min={dayjs().format('YYYY-MM-DDThh:mm')}
                    {...register(`rides.${rideIdx}.scheduledTime`, {
                      required: true,
                    })}
                  />

                  <button
                    type="button"
                    aria-label="Remove ride"
                    className={classNames(
                      'btn-secondary absolute right-1 top-0 h-fit w-fit rounded-full p-1'
                      // loCountBound && 'opacity-50'
                    )}
                    onClick={() => {
                      if (!loCountBound) {
                        remove(rideIdx)
                      }
                    }}
                    disabled={loCountBound}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex gap-3">
                  <label htmlFor="field-pickup">
                    <input
                      {...register(`rides.${rideIdx}.rideType`)}
                      type="radio"
                      value="pickup"
                      id="field-pickup"
                      defaultChecked
                      className="mr-2 border"
                    />
                    Pickup
                  </label>
                  <label htmlFor="field-dropoff">
                    <input
                      {...register(`rides.${rideIdx}.rideType`)}
                      type="radio"
                      value="dropoff"
                      id="field-dropoff"
                      className="mr-2 border border-red-500"
                    />
                    Dropoff
                  </label>
                </div>
              </div>
            )
          })}
          {
            // TODO: Add a driver dropdown if more than 1 driver
            // auto assign the one driver if there's only one
          }
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Add ride"
              disabled={hiCountBound}
              className={classNames(
                'btn-secondary h-fit w-fit rounded-full p-1',
                hiCountBound && 'opacity-50'
              )}
              onClick={() => {
                if (!hiCountBound) increment()
              }}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button className="btn btn-primary" type="submit" disabled={pending}>
            {rideCount.length > 1 ? 'Add Rides' : 'Add Ride'}
          </button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
