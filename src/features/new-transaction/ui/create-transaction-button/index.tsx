import { PlusIcon } from "@heroicons/react/outline"
import { useEvent } from "effector-react/scope"
import { newTransactionModel } from "../.."

export const CreateTransactionButton = () => {
    const handleCreateTransaction = useEvent(
        newTransactionModel.events.createTransaction
    )
    return (
        <button
            className="p-2 bg-green-600  drop-shadow-lg text-white first-letter:uppercase fixed bottom-8 right-8 rounded-full z-10"
            onClick={handleCreateTransaction}
        >
            <PlusIcon className="h-10 w-10" />
        </button>
    )
}
