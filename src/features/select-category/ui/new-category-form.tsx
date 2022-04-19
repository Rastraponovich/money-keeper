import TextInput from "@/src/shared/ui/text-input"
import { Transition } from "@headlessui/react"
import { useEvent } from "effector-react/scope"
import { selectCategoryModel } from ".."
import { ListActions } from "../../new-transaction/ui/list-actions"

export const NewCategoryForm = () => {
    const showAddCategory = selectCategoryModel.selectors.useShowAddCategory()
    const newCategory = selectCategoryModel.selectors.useNewCategory()

    const handleChange = useEvent(selectCategoryModel.events.set)
    return (
        <Transition
            appear
            show={showAddCategory}
            as={"div"}
            className="flex flex-col bg-gray-200 p-2 rounded space-y-2"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <TextInput
                type="text"
                id="name"
                placeholder="новая категория"
                title="новая категория"
                value={newCategory.name}
                onChange={handleChange}
            />
            <ListActions
                onClose={selectCategoryModel.events.toggle}
                onSave={selectCategoryModel.events.save}
            />
        </Transition>
    )
}
