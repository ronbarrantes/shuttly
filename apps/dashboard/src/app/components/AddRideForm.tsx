'use client'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useState } from 'react'
import { type AddPassenger, type AddRide, ZodRideType } from '@actions/ride'
import { Dialog } from '@components/Dialog'
import {
  Controller,
  FormProvider,
  useForm,
  // useFormContext,
} from 'react-hook-form'
import { useKeepCount } from '../hooks'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
}

type RideItem = ZodRideType['rides'][0]

export const AddRideForm = ({ addPassenger, addRide }: AddRideFormProps) => {
  // the form for now will have just the fields to edit
  // but eventually it will have a search feature that will look for
  // passengers that have already been added to the database
  // if they're not in the database it will just add them without much fuzz

  // const [rideCount, setRideCount] = useState<number[]>([0])
  const { count: rideCount, increment, remove } = useKeepCount()
  const disabledRideCount = rideCount.length <= 1

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZodRideType>()

  const onSubmit = (data: ZodRideType) => {
    // console.log(data)

    // const rides = data.rides.filter((ride) => )

    addRide(data)
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
              {...register('name')}
              placeholder="Name"
              className="rounded-lg border border-black"
            />
            <input
              {...register('address')}
              placeholder="Address"
              className="rounded-lg border border-black"
            />
            <input
              className="rounded-lg border border-black"
              placeholder="Phone Number*"
              {...register('phone')}
            />

            <hr />

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Add ride"
                className="rounded-lg border border-black"
                onClick={increment}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <div>
              {rideCount.map((num) => (
                <span key={`num${num}`}>{num}</span>
              ))}
            </div>

            {rideCount.map((rideIdx, idx) => {
              return (
                <div key={`${rideIdx}-${idx}`}>
                  <span>{rideIdx}</span>
                  <input
                    type="text"
                    className="rounded-lg border border-black"
                    placeholder="Ride type"
                    {...register(`rides.${rideIdx}.rideType`)}
                  />

                  <input
                    type="date"
                    className="rounded-lg border border-black"
                    placeholder="Date"
                    {...register(`rides.${rideIdx}.scheduledTime`)}
                  />

                  <button
                    type="button"
                    aria-label="Remove ride"
                    className={classNames(
                      'rounded-lg border border-black',
                      disabledRideCount && 'opacity-50'
                    )}
                    onClick={() => {
                      if (rideCount.length > 1) {
                        remove(rideIdx)
                      }
                    }}
                    disabled={disabledRideCount}
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                </div>
              )
            })}

            {
              // TODO: Add a driver dropdown if more than 1 driver
              // auto assign the one driver if there's only one
            }

            <input type="submit" />
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
