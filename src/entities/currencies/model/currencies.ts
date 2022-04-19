import { TCurrency } from "@/src/shared/api"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { ChangeEvent } from "react"
import { __currencies__ } from "../lib"

const $currencies = createStore<TCurrency[]>(__currencies__)
const $totalAmountCurrencies = $currencies.map((state) =>
    state.reduce((acc, val) => acc + val.amount, 0)
)

const toggleAddCurrency = createEvent()

const addNewCurrency = createEvent<TCurrency>()
const saveNewCurrency = createEvent()

const $showAddCurrency = createStore<boolean>(false)
    .on(toggleAddCurrency, (state, _) => !state)
    .reset($currencies)

const $newCurrency = createStore<TCurrency>({} as TCurrency).reset([
    toggleAddCurrency,
    $currencies,
])
const setNewCurrency = createEvent<ChangeEvent<HTMLInputElement>>()

sample({
    clock: setNewCurrency,
    source: $newCurrency,
    fn: (curr, event) => ({ ...curr, [event.target.id]: event.target.value }),
    target: $newCurrency,
})

sample({
    clock: saveNewCurrency,
    source: $newCurrency,
    target: addNewCurrency,
})

sample({
    clock: addNewCurrency,
    source: $currencies,
    filter: (currencies, currency) =>
        currencies.every((item) => currency.name !== item.name),
    fn: (currencies, currency) => [
        ...currencies,
        { ...currency, id: ++currencies.length },
    ],
    target: $currencies,
})

export const events = {
    setNewCurrency,
    saveNewCurrency,
    toggleAddCurrency,
}

const useShowAddCurrency = () => useStore($showAddCurrency)
const useNewCurrency = () => useStore($newCurrency)

export const selectors = {
    useShowAddCurrency,
    useNewCurrency,
}

export { $currencies, $totalAmountCurrencies, $showAddCurrency, $newCurrency }
