'use server'

import { prisma } from 'db'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth, currentUser } from '@clerk/nextjs'
import { ratelimit } from '@/client-data/utils/rate-limiter'

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
  const { userId } = auth()
  const user = await currentUser()

  const testAccount = user?.privateMetadata?.testAccount

  if (!userId) throw new Error('Not logged in')

  if (testAccount) {
    const { success: allowed } = await ratelimit.limit(userId)
    if (!allowed) throw new Error('Number of rides in test account exceeded')
  }

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

  revalidatePath('/')
  return passenger
}

export const getAllRides = async () => {
  const { userId } = auth()

  console.log('USER ID ===>>', userId)
  // if (!userId) throw new Error('Not logged in')

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

export const deleteRide = async (rideId: string) => {
  const { userId } = auth()
  if (!userId) throw new Error('Not logged in')

  const ride = await prisma.ride.delete({
    where: {
      id: rideId,
    },

    select: {
      id: true,
      scheduledTime: true,
      passenger: {
        select: {
          name: true,
        },
      },
    },
  })

  console.log('RIDE DELETED ===>>', ride)

  revalidatePath('/')
  return ride
}

export type AddPassenger = typeof addPassenger
export type AddRide = typeof addRide
export type DeleteRide = typeof deleteRide
export type AllRides = Awaited<ReturnType<typeof getAllRides>>[0]
export type ZodRideType = z.infer<typeof rideObj>
