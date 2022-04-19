import { Event } from "effector"
import { useEvent } from "effector-react"
import { memo } from "react"
interface ListActionProps {
    onSave: Event<void>
    onClose: Event<void>
}
export const ListActions = memo(({ onClose, onSave }: ListActionProps) => {
    const handleSave = useEvent(onSave)
    const handleClose = useEvent(onClose)

    return (
        <div className="flex space-x-4 text-sm text-white">
            <button
                className="bg-green-600 px-2 py-1 first-letter:uppercase rounded drop-shadow-sm"
                onClick={handleSave}
            >
                сохранить
            </button>
            <button
                className="bg-rose-600 px-2 py-1 first-letter:uppercase rounded drop-shadow-sm"
                onClick={handleClose}
            >
                отмена
            </button>
        </div>
    )
})
