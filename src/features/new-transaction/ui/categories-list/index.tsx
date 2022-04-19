import clsx from "clsx"
import { useLayoutEffect } from "react"
import { useEvent, useList } from "effector-react"

import { ListActions } from "../list-actions"
import { newTransactionModel } from "../.."
import { categoriesModel } from "@/src/entities/categories"

import { Transition } from "@headlessui/react"
import { PlusIcon, MinusIcon } from "@heroicons/react/outline"

import Select from "@/src/shared/ui/select"
import TextInput from "@/src/shared/ui/text-input"

export const CategoriesList = () => {
    const showAddCategory = categoriesModel.selectors.useShowAddCategory()
    const newCategory = categoriesModel.selectors.useNewCagegory()
    const currentTransaction =
        newTransactionModel.selectors.useCurrentTransaction()
    const readonly = newTransactionModel.selectors.useReadOnlyTransaction()

    const handleToggleAddNewCategory = useEvent(
        categoriesModel.events.toggleShowAddNewCategory
    )
    const handleSelect = useEvent(
        newTransactionModel.events.setSelectNewTransaction
    )
    const handleChange = useEvent(categoriesModel.events.setNewCategory)

    useLayoutEffect(() => {
        if (showAddCategory) return () => handleToggleAddNewCategory()
    }, [])

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-4">
                <Select
                    title="категория"
                    id="category"
                    disabled={readonly}
                    onChange={handleSelect}
                    value={currentTransaction.category}
                    error={currentTransaction.category === 0}
                    grow
                >
                    <option value={0}>укажите категорию</option>

                    {useList(categoriesModel.$categories, {
                        fn: (category) => (
                            <option value={category.id}>{category.name}</option>
                        ),
                    })}
                </Select>
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
            </div>
            <Transition
                appear
                show={showAddCategory}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="flex flex-col bg-gray-200 p-2 rounded space-y-2">
                    <TextInput
                        type="text"
                        id="name"
                        placeholder="новая категория"
                        title="новая категория"
                        value={newCategory.name}
                        onChange={handleChange}
                    />
                    <ListActions
                        onClose={
                            categoriesModel.events.toggleShowAddNewCategory
                        }
                        onSave={categoriesModel.events.saveNewCategory}
                    />
                </div>
            </Transition>
        </div>
    )
}
