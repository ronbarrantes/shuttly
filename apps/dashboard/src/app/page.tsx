import { Metadata } from 'next'
import { Button, Card } from 'ui'
import { prisma } from 'db'
import { PageLayout } from './components/page-layout'

const CARD_CONTENT = [
  {
    title: 'Caching Tasks',
    href: 'https://turbo.build/repo/docs/core-concepts/caching',
    cta: 'Read More',
  },
  {
    title: 'Running Tasks',
    href: 'https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks',
    cta: 'Read More',
  },
  {
    title: 'Configuration Options',
    href: 'https://turbo.build/repo/docs/reference/configuration',
    cta: 'Read More',
  },
]

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
      <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
        <Button />
      </div>
    </PageLayout>
  )
}
