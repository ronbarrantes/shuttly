import { type PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Header } from './Header'
import { MainNavigation } from './navigation'

import classNames from 'classnames'

export const PageLayout = (
  props: PropsWithChildren & { title: string; noMenu?: boolean }
) => {
  return (
    <div
      className={classNames(
        'flex h-screen w-screen flex-col border border-red-500 p-2 py-2'
      )}
    >
      <Header>{!props.noMenu && <MainNavigation />}</Header>
      <main className="flex flex-col overflow-hidden border border-green-500 ">
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <div className="flex grow flex-col overflow-y-scroll border border-blue-500">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
