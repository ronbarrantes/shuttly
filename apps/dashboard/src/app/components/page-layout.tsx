import { type PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Header } from './Header'
import { MainNavigation } from './navigation'

import classNames from 'classnames'

export const PageLayout = (
  props: PropsWithChildren & {
    title: string
    noMenu?: boolean
    className?: string
  }
) => {
  return (
    <div
      className={classNames(
        'flex h-screen w-screen flex-col p-2 py-2',
        props.className
      )}
    >
      <Header>{!props.noMenu && <MainNavigation />}</Header>
      <main className="flex grow flex-col overflow-hidden">
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <div className="flex grow flex-col overflow-y-scroll">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
