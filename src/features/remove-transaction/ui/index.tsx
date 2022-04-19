import { useEvent } from "effector-react/scope"
import { removeTransactionModel } from ".."

export const RemoveTransactionButton = () => {
    const handleRemoveTransaction = useEvent(
        removeTransactionModel.events.removeTransaction
    )

    return (
        <button
            type="button"
            className="rounded px-2 py-1 bg-rose-600 text-white first-letter:uppercase self-start"
            onClick={handleRemoveTransaction}
        >
            удалить
        </button>
    )
}
