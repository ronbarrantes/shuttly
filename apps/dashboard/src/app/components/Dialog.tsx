import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

export interface DialogState {
  isOpen: boolean
  dialogContent?: React.ReactNode
}

// type DialogAction =
//   | { type: 'OPEN_DIALOG'; payload: React.ReactNode }
//   | { type: 'CLOSE_DIALOG' }

// const dialogReducer = (state: DialogState, action: DialogAction) => {
//   switch (action.type) {
//     case 'OPEN_DIALOG':
//       return {
//         ...state,
//         isOpen: true,
//       }
//     case 'CLOSE_DIALOG':
//       return {
//         ...state,
//         isOpen: false,
//         dialogContent: undefined,
//       }
//     default:
//       throw new Error()
//   }
// }

// export const useDialogStore = () => {
//   const [state, dispatch] = React.useReducer<typeof dialogReducer>(
//     dialogReducer,
//     {
//       isOpen: false,
//       dialogContent: null,
//     }
//   )

//   return {
//     isOpen: state.isOpen,
//     dialogContent: state.dialogContent,
//     openDialog: (content: React.ReactNode) =>
//       dispatch({ type: 'OPEN_DIALOG', payload: content }),
//     closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' }),
//   }
// }

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Title className="text-mauve12 m-0 text-[17px] font-medium">
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
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-blackA8 data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogPrimitive.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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

const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogPrimitive.Trigger asChild>
      <button className="hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet-600 shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
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
