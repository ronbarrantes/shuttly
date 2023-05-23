'use client'
import { type AddPassenger, type AddRide, ZodRideType } from '@actions/ride'
import { Dialog } from '@components/Dialog'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
}

export const AddRideForm = ({ addPassenger, addRide }: AddRideFormProps) => {
  // the form for now will have just the fields to edit
  // but eventually it will have a search feature that will look for
  // passengers that have already been added to the database
  // if they're not in the database it will just add them without much fuzz

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZodRideType>()

  return (
    <div>
      <p>Add Ride Form</p>
      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content title="Add a ride">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <input
              {...register('name')}
              placeholder="First Name"
              className="rounded-lg border border-black"
            />
            <input
              {...register('address')}
              className="rounded-lg border border-black"
            />
            <input
              className="rounded-lg border border-black"
              {...register('phone')}
            />
            <input type="submit" />
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
