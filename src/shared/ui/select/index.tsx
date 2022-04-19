import clsx from "clsx"
import { memo, ReactNode, SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
    title: string
    error?: boolean
    grow?: boolean
}

const Select = ({ children, title, error, grow, ...props }: SelectProps) => {
    return (
        <label
            className={clsx("flex flex-col-reverse space-y-1", grow && "grow")}
        >
            <select
                className={clsx(
                    "peer focus:outline-none focus:border-blue-600 px-2 py-1 border-b-2 border-gray-300 text-gray-900",
                    error && "border-rose-600"
                )}
                {...props}
            >
                {children}
            </select>
            <span className="text-gray-400 text-sm peer-focus:text-gray-600">
                {title}
            </span>
        </label>
    )
}

export default memo(Select)
