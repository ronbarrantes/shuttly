import { type PropsWithChildren } from 'react'

export const PageLayout = (
  props: PropsWithChildren & { title: string; noMenu?: boolean }
) => {
  return (
    <main className="flex grow flex-col border border-green-500">
      <h1 className="overflow-y-scroll text-2xl font-semibold">
        {props.title}
      </h1>
      {props.children}
    </main>
  )
}
