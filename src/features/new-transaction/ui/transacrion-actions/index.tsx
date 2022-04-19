import { RemoveTransactionButton } from "@/src/features/remove-transaction"
import clsx from "clsx"
import { useEvent } from "effector-react"

import { newTransactionModel } from "../.."

export const NewTransactionActions = () => {
    const { useDisabledTransaction, useReadOnlyTransaction } =
        newTransactionModel.selectors
    const { cancelCreateTransaction, toggleReadOnlyTransaction } =
        newTransactionModel.events
    const disabledTransaction = useDisabledTransaction()
    const readonly = useReadOnlyTransaction()

    const handleToggleReadonly = useEvent(toggleReadOnlyTransaction)
    const handleClose = useEvent(cancelCreateTransaction)

    return (
        <div className="flex space-x-2 " style={{ marginTop: "2rem" }}>
            <button
                type="submit"
                disabled={disabledTransaction || readonly}
                className={clsx(
                    "rounded px-2 py-1 bg-green-600 text-white first-letter:uppercase self-start",
                    disabledTransaction || (readonly && "bg-opacity-50")
                )}
            >
                сохранить
            </button>
            <button
                type="button"
                onClick={handleToggleReadonly}
                disabled={!readonly}
                className={clsx(
                    "rounded px-2 py-1 bg-blue-600 text-white first-letter:uppercase self-start",
                    !readonly && "bg-opacity-50"
                )}
            >
                редактировать
            </button>
            <RemoveTransactionButton />
            <div className="grow"></div>
            <button
                type="button"
                onClick={handleClose}
                className="rounded px-2 py-1 bg-rose-600 text-white first-letter:uppercase self-start"
            >
                закрыть
            </button>
        </div>
    )
}
