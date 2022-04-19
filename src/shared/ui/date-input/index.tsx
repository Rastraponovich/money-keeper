import clsx from "clsx"
import { InputHTMLAttributes, memo } from "react"

type TVariant = "light" | "dark"

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    col?: boolean
    variant?: TVariant
    fullWidth?: boolean
}

const DateInput = ({
    variant = "light",
    col = false,
    label,
    className,
    fullWidth = false,
    ...props
}: DateInputProps) => {
    return (
        <label
            className={clsx(
                "flex flex-col-reverse space-y-1   bg-transparent",
                fullWidth && "w-full"
            )}
        >
            <input
                type="date"
                className={clsx(
                    className,
                    variant === "light"
                        ? "text-white border-white"
                        : "text-gray-900 border-gray-300",
                    "peer  w-full border-b-2   bg-transparent px-1 focus:outline-none focus:border-blue-800"
                )}
                {...props}
            />
            <span
                className={clsx(
                    variant === "light"
                        ? "text-white/70  peer-focus:text-white"
                        : "text-gray-600  peer-focus:text-gray-600",
                    "text-sm transition-all"
                )}
            >
                {label}
            </span>
        </label>
    )
}

export default memo(DateInput)
