import { Metadata } from 'next'
import { Button, Card } from 'ui'
import { prisma } from 'db'
import { PageLayout } from './components/page-layout'
import { DashboardTable } from './components/DashboardTable'

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
}

const getAllRides = async () => {
  const rides = await prisma.ride.findMany({
    include: {
      driver: true,
      passenger: true,
    },
    take: 10, // for now, get all of them later
  })
  return rides
}

export type InferredRide = Awaited<ReturnType<typeof getAllRides>>[0]

export default async function Home() {
  const rides = await getAllRides()

  return (
    <PageLayout title="Dashboard">
      <DashboardTable rides={rides} />
    </PageLayout>
  )
}
