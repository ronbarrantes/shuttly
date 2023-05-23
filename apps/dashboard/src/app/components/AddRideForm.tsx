'use client'
import type { AddPassenger, AddRide } from '@actions/ride'
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
  } = useForm()

  // = useForm({
  //   defaultValues: {},
  // })

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
              {...register('firstName')}
              placeholder="First Name"
              className="rounded-lg border border-black"
            />
            <input
              {...register('lastName', { required: true })}
              className="rounded-lg border border-black"
            />
            {errors.lastName && <p>Last name is required.</p>}
            <input
              className="rounded-lg border border-black"
              {...register('age', { pattern: /\d+/ })}
            />
            {errors.age && <p>Please enter number for age.</p>}
            <input type="submit" />
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
