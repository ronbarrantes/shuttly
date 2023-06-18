import { Metadata } from 'next'

import { addRide, deleteRide, editRide,getAllRides } from '@actions/ride'
import { currentUser } from '@clerk/nextjs'

import { AddRideForm } from '@components/AddRideForm'
import { DashboardTable } from '@components/DashboardTable'
import { DialogV2 } from '@components/Dialog'
import { PageLayout } from '@components/page-layout'

export const metadata: Metadata = {
  title: 'Shuttly | Dashboard',
}

export default async function Home() {
  const user = await currentUser()
  const rides = await getAllRides()
  // const editRide =

  return (
    <PageLayout title="Dashboard">
      <AddRideForm
        // addPassenger={addPassenger}
        addRide={addRide}
        companyId={user!.privateMetadata.companyId as string}
      />
      <DashboardTable
        rides={rides}
        editRide={editRide}
        deleteRide={deleteRide}
      />
      <DialogV2 />
    </PageLayout>
  )
}
