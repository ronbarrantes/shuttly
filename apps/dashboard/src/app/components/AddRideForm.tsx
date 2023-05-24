'use client'
import { useTransition } from 'react'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { type AddPassenger, type AddRide, ZodRideType } from '@actions/ride'
import { Dialog } from '@components/Dialog'
import dayjs from 'dayjs'

import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { useKeepCount } from '../hooks'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
  companyId: string
}

type RideItem = ZodRideType['rides'][0]

export const AddRideForm = ({
  addPassenger,
  addRide,
  companyId,
}: AddRideFormProps) => {
  // the form for now will have just the fields to edit
  // but eventually it will have a search feature that will look for
  // passengers that have already been added to the database
  // if they're not in the database it will just add them without much fuzz
  const [pending, startTransition] = useTransition()
  const { count: rideCount, increment, remove } = useKeepCount()

  const hiCountBound = rideCount.length >= 4
  const loCountBound = rideCount.length <= 1

  const {
    watch,
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ZodRideType>()

  const onSubmit = (data: ZodRideType) => {
    startTransition(async () => {
      const rides = rideCount.map((rideIdx) => data.rides[rideIdx])
      data = { ...data, companyId, rides }
      await addRide(data)
      reset()
    })
  }

  return (
    <div>
      <p>Add Ride Form</p>
      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content title="Add a ride">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('name', { required: true })}
              placeholder="Name"
              className="rounded-lg border border-black"
            />
            <input
              {...register('address', { required: true })}
              placeholder="Address"
              className="rounded-lg border border-black"
            />
            <input
              className="rounded-lg border border-black"
              placeholder="Phone Number*"
              {...register('phone', { required: true })}
            />
            <hr />{' '}
            {rideCount.map((rideIdx, idx) => {
              return (
                <div key={`${rideIdx}-${idx}`}>
                  <Controller
                    name={`rides.${rideIdx}.rideType`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="rounded-lg border border-black"
                        required
                      >
                        <option defaultChecked value={''}>
                          Ride type
                        </option>
                        <option value="pickup">Pickup</option>
                        <option value="dropoff">Dropoff</option>
                      </select>
                    )}
                  />

                  <input
                    type="datetime-local"
                    className="rounded-lg border border-black"
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
                      'rounded-lg border border-black',
                      loCountBound && 'opacity-50'
                    )}
                    onClick={() => {
                      if (!loCountBound) {
                        remove(rideIdx)
                      }
                    }}
                    disabled={loCountBound}
                  >
                    <MinusIcon className="h-6 w-6" />
                  </button>
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
                  'rounded-lg border border-black',
                  hiCountBound && 'opacity-50'
                )}
                onClick={() => {
                  if (!hiCountBound) increment()
                }}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              className="w-fit rounded-lg border border-blue-500 bg-blue-400 p-2 py-1"
              type="submit"
            >
              {rideCount.length > 1 ? 'Add Rides' : 'Add Ride'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
