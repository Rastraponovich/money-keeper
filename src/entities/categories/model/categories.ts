import { TCategory } from "@/src/shared/api"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { ChangeEvent } from "react"
import { __bulkCategories__, __bulkCategory__ } from "../lib"

const $categories = createStore<TCategory[]>(__bulkCategories__)

const toggleShowAddNewCategory = createEvent()
const $showAddNewCategory = createStore<boolean>(false)
    .on(toggleShowAddNewCategory, (state, _) => !state)
    .reset($categories)

const $newCategory = createStore<TCategory>({} as TCategory).reset([
    $categories,
    toggleShowAddNewCategory,
])

const setNewCategory = createEvent<ChangeEvent<HTMLInputElement>>()

sample({
    clock: setNewCategory,
    source: $newCategory,
    fn: (categ, event) => ({ ...categ, [event.target.id]: event.target.value }),
    target: $newCategory,
})

const saveNewCategory = createEvent()

const addNewCategory = createEvent<TCategory>()

sample({
    clock: saveNewCategory,
    source: $newCategory,
    target: addNewCategory,
})

sample({
    clock: addNewCategory,
    source: $categories,
    filter: (categories, category) =>
        categories.every((item) => item.name !== category.name),
    fn: (categories, category) => [
        ...categories,
        { ...category, id: ++categories.length },
    ],
    target: $categories,
})

const deleteCategory = createEvent<number>()

sample({
    clock: deleteCategory,
    source: $categories,
    filter: (categories, event) => categories.some((item) => item.id === event),
    fn: (categories, event) => categories.filter((item) => item.id !== event),
    target: $categories,
})

const $selectedCategory = createStore<TCategory>(__bulkCategory__)

const selectCategory = createEvent<TCategory["id"]>()

sample({
    clock: selectCategory,
    source: $categories,
    filter: (categ, selected) => categ.some((item) => item.id === selected),
    fn: (categories, selected) =>
        categories.find((item) => item.id === selected) as TCategory,
    target: $selectedCategory,
})

const useNewCagegory = () => useStore($newCategory)
const useShowAddCategory = () => useStore($showAddNewCategory)

export const selectors = {
    useNewCagegory,
    useShowAddCategory,
}

export const events = {
    selectCategory,
    deleteCategory,
    saveNewCategory,
    toggleShowAddNewCategory,
    setNewCategory,
}

export { $categories, $selectedCategory, $showAddNewCategory, $newCategory }
