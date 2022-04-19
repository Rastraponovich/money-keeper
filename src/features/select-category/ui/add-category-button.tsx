import { PlusIcon, MinusIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import { useEvent } from "effector-react/scope"
import { selectCategoryModel } from ".."

export const AddCategoryButton = () => {
    const showAddCategory = selectCategoryModel.selectors.useShowAddCategory()
    const handleToggleAddNewCategory = useEvent(
        selectCategoryModel.events.toggle
    )

    return (
        <button
            type="button"
            className={clsx(
                "drop-shadow-md p-2  rounded-full text-white self-end",
                !showAddCategory ? "bg-green-600" : "bg-rose-600"
            )}
            onClick={handleToggleAddNewCategory}
        >
            {!showAddCategory ? (
                <PlusIcon className="h-4 w-4" />
            ) : (
                <MinusIcon className="h-4 w-4" />
            )}
        </button>
    )
}
