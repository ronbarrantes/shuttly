import React from 'react'

export const MessageBox = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex justify-center p-5 align-middle">
      <div className="text mt-12 flex w-1/2 max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 p-8 shadow-sm shadow-slate-200">
        <h2 className="text-center text-2xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  )
}
