import { Metadata } from 'next'
import { Button, Card, Table, createColumnHelper } from 'ui'
import { prisma } from 'db'
import { PageLayout } from './components/page-layout'
import { DashboardTable } from './components/DashboardTable'

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
}

const getAllPeople = async () => {
  const passengers = await prisma.passenger.findMany()
  return passengers
}

export default async function Home() {
  const passengers = await getAllPeople()

  return (
    <PageLayout title="Dashboard">
      <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl xl:text-8xl">
        Web
        <span className="from-brandred to-brandblue block bg-gradient-to-r bg-clip-text px-2 text-transparent">
          Turborepo Example
        </span>
      </h1>
      <DashboardTable passengers={passengers} />
    </PageLayout>
  )
}
