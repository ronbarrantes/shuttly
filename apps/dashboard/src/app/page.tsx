import { Metadata } from 'next'
import { Button, Card } from 'ui'
import { prisma } from 'db'

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

const getCompanies = async () => {
  const passengers = await prisma.company.findMany()
  return passengers
}

export default async function Home() {
  const passengers = await getAllPeople()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-6xl font-extrabold tracking-tight text-center text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Web
          <span className="block px-2 text-transparent bg-gradient-to-r from-brandred to-brandblue bg-clip-text">
            Turborepo Example
          </span>
        </h1>
        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <Button />
        </div>

        <div className="grid grid-cols-1 gap-4 mt-12 sm:grid-cols-3 place-content-evenly">
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>

        <div className="flex flex-wrap max-w-3xl gap-2 m-auto">
          {passengers.map((passenger) => {
            return (
              <div key={passenger.id}>
                <h1>{passenger.name}</h1>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
