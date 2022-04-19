import { Transition } from "@headlessui/react"
import { memo } from "react"
interface DonutSliceProps {
    i: number
    fill: string
    commands: string[]
}
export const DonutSlice = memo(({ i, fill, commands }: DonutSliceProps) => {
    return (
        <Transition.Child
            as="g"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <path
                key={i}
                className={`${fill}`}
                stroke="none"
                d={commands.join(" ")}
            />
        </Transition.Child>
    )
})
