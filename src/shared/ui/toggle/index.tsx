import { memo } from "react"
import { Switch } from "@headlessui/react"
import clsx from "clsx"

interface ToggleProps {
    onChange(): void
    enabled: boolean
    disabled?: boolean
}

const Toggle = ({ onChange, enabled, disabled }: ToggleProps) => {
    return (
        <Switch
            checked={enabled}
            onChange={onChange}
            disabled={disabled}
            className={clsx(
                disabled && "opacity-60 cursor-default",
                enabled ? "bg-green-600" : "bg-red-600",
                "relative inline-flex flex-shrink-0 h-[18px] w-[34px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
            )}
        >
            <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
        </Switch>
    )
}

export default memo(Toggle)
