import { Metadata } from 'next'
import { PageLayout } from '@components/page-layout'
import { DashboardTable } from '@components/DashboardTable'
import { AddRideForm } from '@components/AddRideForm'
import { addRide, getAllRides, deleteRide } from '@actions/ride'
import { currentUser } from '@clerk/nextjs'
import { DialogV2 } from '@components/Dialog'

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
}

export default async function Home() {
  const user = await currentUser()
  const rides = await getAllRides()

  return (
    <PageLayout title="Dashboard">
      <AddRideForm
        // addPassenger={addPassenger}
        addRide={addRide}
        companyId={user!.privateMetadata.companyId as string}
      />
      <DashboardTable rides={rides} deleteRide={deleteRide} />
      <DialogV2 />
    </PageLayout>
  )
}
