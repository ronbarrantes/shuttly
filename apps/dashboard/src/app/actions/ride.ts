'use server'

import { prisma } from 'db'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export const addPassenger = async ({}) => {
  console.log('ADDING A PASSENGER')
}

const rideObj = z
  .object({
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
      })
    ),
  })
  .refine((data) => {
    if (!!data.passengerId) {
      return {
        ...data,
        name: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
      }
    }
  })

export const addRide = async (rideInfo: ZodRideType) => {
  // if (passengerId && passengerId.length) {
  //   const theRides = await prisma.ride.createMany({
  //     data: rides.map((ride) => {
  //       return {
  //         ...ride,
  //         companyId,
  //         passengerId,
  //       }
  //     }),
  //   })

  //   return theRides
  // }

  const passenger = await prisma.passenger.create({
    data: {
      name: rideInfo.name,
      address: rideInfo.address,
      phone: rideInfo.phone,
      companyId: rideInfo.companyId,

      rides: {
        create: rideInfo.rides.map((ride) => {
          return {
            ...ride,
            scheduledTime: new Date(ride.scheduledTime),
            companyId: rideInfo.companyId,
          }
        }),
      },
    },
  })

  return passenger

  revalidatePath('/')
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
export type AllRides = Awaited<ReturnType<typeof getAllRides>>[0]
export type ZodRideType = z.infer<typeof rideObj>
