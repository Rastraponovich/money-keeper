import { transactionsModel } from "@/src/entities/transactions"
import { TTransaction } from "@/src/shared/api"
import dayjs from "dayjs"
import { createEffect, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { debug } from "patronum"
import { ChangeEvent } from "react"

const cancelCreateTransaction = createEvent()
const createTransaction = createEvent()
const toggleOperationType = createEvent()

export const addTransactionFx = createEffect<TTransaction, any>((data) => data)

export const $newTransaction = createStore<TTransaction>({
    id: 0,
    amount: 0,
    category: 0,
    currency: 0,
    opearation: "incomming",
    state: "inprogress",
    description: "",
    date: dayjs(new Date()).format("YYYY-MM-DD"),
})
    .on(toggleOperationType, (state, _) => ({
        ...state,
        opearation:
            state.opearation === "incomming" ? "outgouing" : "incomming",
    }))
    .reset([cancelCreateTransaction, addTransactionFx.done])

const saveTransaction = createEvent<ChangeEvent<HTMLFormElement>>()
saveTransaction.watch((e) => e.preventDefault())

sample({
    clock: saveTransaction,
    source: $newTransaction,
    target: addTransactionFx,
})

export const $showTransactionWindow = createStore<boolean>(false)
    .on(createTransaction, () => true)
    .reset([cancelCreateTransaction, addTransactionFx.done])

const setSelectNewTransaction = createEvent<ChangeEvent<HTMLSelectElement>>()
const setAmountNewTransaction = createEvent<ChangeEvent<HTMLInputElement>>()
sample({
    clock: [setSelectNewTransaction, setAmountNewTransaction],
    source: $newTransaction,
    fn: (transaction, event) => ({
        ...transaction,
        [event.target.id]: Number(event.target.value), //Number(event.target.value.replace(/[^-0-9]/g, "")),
    }),
    target: $newTransaction,
})

const setNewTransaction = createEvent<ChangeEvent<HTMLInputElement>>()
sample({
    clock: setNewTransaction,
    source: $newTransaction,
    fn: (transaction, event) => ({
        ...transaction,
        [event.target.id]: event.target.value,
    }),
    target: $newTransaction,
})

const toggleReadOnlyTransaction = createEvent()
const selectTransaction = createEvent<number>()

sample({
    clock: selectTransaction,
    fn: () => true,
    target: $showTransactionWindow,
})

export const $readOnlyTransaction = createStore<boolean>(false)
    .reset(createTransaction)
    .on(selectTransaction, () => true)
    .on(toggleReadOnlyTransaction, (state, _) => !state)

export const $disabledSaveTransaction = createStore<boolean>(true)

sample({
    clock: $newTransaction,
    fn: (trans) => {
        const condition =
            trans.description.length > 0 &&
            trans.category !== 0 &&
            trans.currency !== 0

        if (condition) return false

        return true
    },
    target: $disabledSaveTransaction,
})

const useCurrentTransaction = () => useStore($newTransaction)
const useReadOnlyTransaction = () => useStore($readOnlyTransaction)
const useShowTransactionWindow = () => useStore($showTransactionWindow)
const useDisabledTransaction = () => useStore($disabledSaveTransaction)
export const selectors = {
    useCurrentTransaction,
    useReadOnlyTransaction,
    useShowTransactionWindow,
    useDisabledTransaction,
}
export const events = {
    saveTransaction,
    cancelCreateTransaction,
    setAmountNewTransaction,
    setSelectNewTransaction,
    setNewTransaction,
    toggleReadOnlyTransaction,
    toggleOperationType,
    selectTransaction,
    createTransaction,
}
