'use server'

import { prisma } from 'db'
import { z } from 'zod'

export const addPassenger = async ({}) => {
  console.log('ADDING A PASSENGER')
}

const RideObj = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  companyId: z.string(),
  passengerId: z.string().optional(),
  rides: z.array(
    z.object({
      rideType: z.enum(['pickup', 'dropoff']),
      scheduledTime: z.date(),
      altAddress: z.string().optional(),
      driverId: z.string().optional(),
      companyId: z.string(),
    })
  ),
})

export const addRide = async ({
  name,
  address,
  phone,
  companyId,
  rides,
  passengerId,
}: RideType) => {
  if (!passengerId) {
  }

  const passenger = await prisma.passenger.create({
    data: {
      name,
      address,
      phone,
      companyId,
      rides: {
        create: rides,
      },
    },
  })
}

export const getAllRides = async () => {
  const rides = await prisma.ride.findMany({
    include: {
      driver: true,
      passenger: true,
    },
    take: 10, // for now, get all of them later
    orderBy: {
      createdAt: 'desc',
    },
  })
  return rides
}

export type AddPassenger = typeof addPassenger
export type AddRide = typeof addRide
export type InferredRide = Awaited<ReturnType<typeof getAllRides>>[0]
export type RideType = z.infer<typeof RideObj>
