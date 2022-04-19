import { TCategory } from "@/src/shared/api"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { ChangeEvent } from "react"

const select = createEvent<ChangeEvent<HTMLSelectElement>>()

const toggle = createEvent()
const $showAddCategory = createStore<boolean>(false).on(
    toggle,
    (state, _) => !state
)

const save = createEvent()

const set = createEvent<ChangeEvent<HTMLInputElement>>()
const $newCategory = createStore<TCategory>({ id: 0, name: "" }).on(
    set,
    (state, event) => ({
        ...state,
        [event.target.id]: event.target.value,
    })
)

export const events = {
    select,
    toggle,
    save,
    set,
}

const useNewCategory = () => useStore($newCategory)

const useShowAddCategory = () => useStore($showAddCategory)
export const selectors = {
    useShowAddCategory,
    useNewCategory,
}
