import { type PropsWithChildren } from 'react'

export const PageLayout = (
  props: PropsWithChildren & { title: string; noMenu?: boolean }
) => {
  return (
    <main className="flex grow flex-col overflow-hidden border border-green-500">
      <div className="overflow-y-scroll">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        {props.children}
      </div>
    </main>
  )
}

export const PageLayout2 = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center ">
      <div className="w-full border-x border-slate-500 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  )
}
