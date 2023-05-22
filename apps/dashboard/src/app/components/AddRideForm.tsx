import type { AddPassenger, AddRide } from '../actions/ride'

type AddRideFormProps = {
  addPassenger: AddPassenger
  addRide: AddRide
}

export const AddRideForm = ({ addPassenger, addRide }: AddRideFormProps) => {
  return (
    <div>
      <p>Add Ride Form</p>
    </div>
  )
}
