'use client'
import type { AddPassenger, AddRide } from '@actions/ride'
import { Dialog } from '@components/Dialog'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
}

export const AddRideForm = ({ addPassenger, addRide }: AddRideFormProps) => {
  // have a button to that will bring out a form in a modal

  // the form for now will have just the fields to edit
  // but eventually it will have a search feature that will look for
  // passengers that have already been added to the database
  // if they're not in the database it will just add them without much fuzz

  return (
    <div>
      <p>Add Ride Form</p>
      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content title="Add a ride">
          <p>Hello rider</p>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
