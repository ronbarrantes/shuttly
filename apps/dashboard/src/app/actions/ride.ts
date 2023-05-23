'use server'

import { prisma } from 'db'
import { z } from 'zod'

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
  console.log('RIDE INFO =====>>>>', rideInfo)

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

  // console.log('continuing with adding a passenger')
  // const passenger = await prisma.passenger.create({
  //   data: {
  //     name,
  //     address,
  //     phone,
  //     companyId,
  //     rides: {
  //       create: rides.map((ride) => {
  //         return {
  //           ...ride,
  //           companyId,
  //         }
  //       }),
  //     },
  //   },
  // })
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
export type ZodRideType = z.infer<typeof rideObj>
