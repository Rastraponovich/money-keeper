import clsx from "clsx"
import { InputHTMLAttributes, memo } from "react"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string
    required?: boolean
    error?: boolean
    errorText?: string
}

const TextInput = ({
    title,
    required,
    error,
    errorText,
    ...props
}: TextInputProps) => {
    return (
        <label className="flex flex-col space-y-1 w-full relative py-3 bg-transparent">
            <input
                type="text"
                className={clsx(
                    props.className,
                    "peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent bg-transparent px-1 focus:outline-none focus:border-blue-600",
                    error && " border-b-rose-500"
                )}
                {...props}
            />

            <span className="text-red-400 text-sm italic ml-2 h-3">
                {error && errorText}
            </span>
            <span
                className={clsx(
                    "absolute left-1 -top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm",

                    required && "after:ml-1 after:content-['*']"
                )}
            >
                {title}
            </span>
        </label>
    )
}

export default memo(TextInput)
