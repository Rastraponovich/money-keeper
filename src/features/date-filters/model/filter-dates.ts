import { TFilteredDates } from "@/src/entities/transactions/lib"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { ChangeEvent } from "react"

const setFilteredDates = createEvent<ChangeEvent<HTMLInputElement>>()
export const $filteredDates = createStore<TFilteredDates>({
    endDate: "",
    startDate: "",
}).on(setFilteredDates, (dates, event) => ({
    ...dates,
    [event.target.id]: event.target.value,
}))

const useFilteredDates = () => useStore($filteredDates)
export const selectors = {
    useFilteredDates,
}

export const events = {
    setFilteredDates,
}
