import { useLayoutEffect } from "react"
import { useEvent, useList } from "effector-react"

import { categoriesModel } from "@/src/entities/categories"

import Select from "@/src/shared/ui/select"
import { AddCategoryButton } from "./add-category-button"
import { newTransactionModel } from "../../new-transaction"
import { selectCategoryModel } from ".."
import { NewCategoryForm } from "./new-category-form"

export const CategoriesList = () => {
    const showAddCategory = selectCategoryModel.selectors.useShowAddCategory()
    const currentTransaction =
        newTransactionModel.selectors.useCurrentTransaction()
    const readonly = newTransactionModel.selectors.useReadOnlyTransaction()

    const handleToggleAddNewCategory = useEvent(
        categoriesModel.events.toggleShowAddNewCategory
    )
    const handleSelect = useEvent(
        newTransactionModel.events.setSelectNewTransaction
    )

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
                <AddCategoryButton />
            </div>
            <NewCategoryForm />
        </div>
    )
}
