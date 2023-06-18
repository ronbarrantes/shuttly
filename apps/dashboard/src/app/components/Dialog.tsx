'use client'
import React from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { create } from 'zustand'

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Title className="m-0 mb-2 text-xl font-semibold text-mauve12">
    {children}
  </DialogPrimitive.Title>
)

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
    {children}
  </DialogPrimitive.Description>
)

const DialogContent = ({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={classNames(
          'data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] border border-slate-200 bg-white p-[25px] text-black shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none',
          className
        )}
      >
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        {children}
        <DialogPrimitive.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

const DialogClose = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Close asChild>{children}</DialogPrimitive.Close>
)

const DialogTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  /// may have to use the dialogStore to open and close the dialog

  return (
    <DialogPrimitive.Trigger asChild>
      <button
        type="button"
        className={classNames(
          'inline-flex w-fit items-center justify-center font-medium leading-none focus:shadow-none  focus:outline-none',
          className
        )}
      >
        {children}
      </button>
    </DialogPrimitive.Trigger>
  )
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} open={open}>
      <>{children}</>
    </DialogPrimitive.Root>
  )
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Close = DialogClose

// VVV           VVV        22222222
//  VVV         VVV       222      222
//   VVV       VVV                222
//    VVV     VVV               222
//     VVV   VVV            222
//      VVV VVV           222
//       VVVV             222222222222
interface DialogState {
  isOpen: boolean
  setIsOpen: () => void
  dialogContent: React.ReactNode
  dialogTitle: string
  handleDialog: ({
    content,
    title,
  }: {
    title: string
    content: React.ReactNode
  }) => void
  handleDialogClose: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  dialogTitle: '',
  dialogContent: null,
  handleDialog: ({ title, content }) =>
    set({ dialogTitle: title, dialogContent: content, isOpen: true }),
  handleDialogClose: () => set({ dialogContent: null, isOpen: false }),
}))

export const DialogV2 = () => {
  const dialogStore = useDialogStore()
  const { isOpen, dialogContent, dialogTitle, handleDialogClose } = dialogStore

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <Dialog.Content title={dialogTitle}>{dialogContent}</Dialog.Content>
    </Dialog>
  )
}

DialogV2.useDialogStore = useDialogStore
