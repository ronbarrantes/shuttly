'use server'

import { prisma } from 'db'

export const addPassenger = () => {}

export const addRide = () => {}

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
