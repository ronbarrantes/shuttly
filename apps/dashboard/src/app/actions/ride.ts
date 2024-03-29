'use server'

import { revalidatePath } from 'next/cache'

import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from 'db'
import { z } from 'zod'

import { ratelimit } from '@/client-data/utils/rate-limiter'

// TODO: Create a way to search for the current passengers and add rides to them
// if they already exist

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

const rideEditObj = z.object({
  id: z.string(),
  scheduledTime: z.string().optional(),
  altAddress: z.string().optional(),
  useAltAddress: z.boolean().optional(),
  driverId: z.string().optional(),
})

export const addRide = async (rideInfo: ZodRideType) => {
  const { userId } = auth()
  if (!userId) throw new Error('Not logged in')

  const testAccount = (await currentUser())?.privateMetadata.testAccount
  if (testAccount) {
    const { success: allowed } = await ratelimit.limit(userId)
    if (!allowed) throw new Error('Number of actions exceeded for today')
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
  if (!userId) throw new Error('Not logged in')

  const rides = await prisma.ride.findMany({
    include: {
      driver: true,
      passenger: true,
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return rides
}

export const editRide = async (rideInfo: ZodEditRide) => {
  const { userId } = auth()
  if (!userId) throw new Error('Not logged in')

  const user = await currentUser()
  const testAccount = user?.privateMetadata?.testAccount

  if (testAccount) {
    const { success: allowed } = await ratelimit.limit(userId)
    if (!allowed) throw new Error('Number of actions exceeded for today')
  }

  const useAltAddress = rideInfo.altAddress?.length
    ? rideInfo.useAltAddress
    : false

  const ride = await prisma.ride.update({
    where: {
      id: rideInfo.id,
    },
    data: {
      scheduledTime: rideInfo.scheduledTime
        ? new Date(rideInfo.scheduledTime)
        : undefined,
      altAddress: rideInfo.altAddress?.length ? rideInfo.altAddress : undefined,
      driverId: rideInfo.driverId?.length ? rideInfo.driverId : undefined,
      useAltAddress,
    },
  })

  revalidatePath('/')
  return ride
}

export const deleteRide = async (rideId: string) => {
  const { userId } = auth()
  if (!userId) throw new Error('Not logged in')

  const user = await currentUser()
  const testAccount = user?.privateMetadata?.testAccount

  if (testAccount) {
    const { success: allowed } = await ratelimit.limit(userId)
    if (!allowed) throw new Error('Number of actions exceeded for today')
  }

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

  revalidatePath('/')
  return ride
}

export type AddRide = typeof addRide
export type DeleteRide = typeof deleteRide
export type EditRide = typeof editRide
export type AllRides = Awaited<ReturnType<typeof getAllRides>>[0]
export type ZodRideType = z.infer<typeof rideObj>
export type ZodEditRide = z.infer<typeof rideEditObj>
