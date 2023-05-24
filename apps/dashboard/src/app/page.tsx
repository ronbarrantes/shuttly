import { Metadata } from 'next'
import { Button, Card } from 'ui'
import { prisma } from 'db'
import { PageLayout } from '@components/page-layout'
import { DashboardTable } from '@components/DashboardTable'
import { AddRideForm } from '@components/AddRideForm'
import { addRide, addPassenger, getAllRides } from '@actions/ride'
import { currentUser, withUser, useAuth, withSession } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
}

export default async function Home() {
  const user = await currentUser()
  const rides = await getAllRides()

  return (
    <PageLayout title="Dashboard">
      <AddRideForm
        addPassenger={addPassenger}
        addRide={addRide}
        companyId={user!.privateMetadata.companyId as string}
      />
      <DashboardTable rides={rides} />
    </PageLayout>
  )
}
