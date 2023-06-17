import * as SwitchPrimitive from '@radix-ui/react-switch'

// export const Switch = SwitchPrimitive

export const Switch = ({ label, id }: { label: string; id: string }) => {
  return (
    <div
      className="flex items-center"
      // style={{ display: 'flex', alignItems: 'center' }}
    >
      <label
        className="pr-[15px] text-[15px] leading-none text-black"
        htmlFor={id}
      >
        {label}
      </label>
      <SwitchPrimitive.Root
        className="relative h-[25px] w-[42px] cursor-default rounded-full border border-slate-400 bg-slate-900 outline-none focus:shadow-[0_0_0_2px]  data-[state=checked]:bg-black"
        id={id}
        // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
      >
        <SwitchPrimitive.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-indigo-600 shadow-[0_1px_1px]  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchPrimitive.Root>

      {/* <p>Hello world</p> */}
    </div>
  )
}
