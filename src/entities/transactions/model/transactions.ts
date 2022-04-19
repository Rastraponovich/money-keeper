import { combine, createEvent, createStore, sample } from "effector"

import { __transactions__ } from "../lib/helpers"
import { TTransaction } from "@/src/shared/api"
import { useStore, useStoreMap } from "effector-react"
import { currenciesModel } from "../../currencies"
import { categoriesModel } from "../../categories"
import { newTransactionModel } from "@/src/features/new-transaction"
import { filteredDatesModel } from "@/src/features/date-filters"

const $transactions = createStore<TTransaction[]>(__transactions__).on(
    newTransactionModel.addTransactionFx,
    (state, transaction) => [...state, transaction]
)

sample({
    clock: newTransactionModel.events.selectTransaction,
    source: $transactions,
    filter: (transactions, id) => transactions.some((item) => item.id === id),
    fn: (transactions, id) =>
        transactions.find((item) => item.id === id) as TTransaction,
    target: newTransactionModel.$newTransaction,
})

const $filteredTransactions = combine(
    $transactions,
    filteredDatesModel.$filteredDates,
    (transactions, dates) => {
        let start = 0
        let end = new Date().getTime()
        if (dates.startDate !== "") start = new Date(dates.startDate).getTime()
        if (dates.endDate !== "") end = new Date(dates.endDate).getTime()

        if (start > 0) {
            return transactions.filter(
                (item) =>
                    new Date(item.date!).getTime() >= start! &&
                    new Date(item.date!).getTime() <= end
            )
        }

        return transactions.filter(
            (item) => new Date(item.date!).getTime() <= end
        )
    }
)

const $totalTransactionAmount = $filteredTransactions.map((transactions) =>
    transactions.reduce((acc, val) => acc + val.amount, 0)
)

const editTransaction = createEvent<TTransaction>()

sample({
    clock: editTransaction,
    source: $transactions,
    fn: (transaction, payload) => [
        ...transaction.filter((item) => item.id !== payload.id),
        payload,
    ],
    target: $transactions,
})

const removeTransaction = createEvent<number>()

sample({
    clock: removeTransaction,
    source: $transactions,
    fn: (transactions, id) => transactions.filter((item) => item.id !== id),
    target: $transactions,
})

const $balance = combine($filteredTransactions, (transactions) => {
    return {
        total: transactions.reduce((acc, val) => {
            return acc + val.amount
        }, 0),
        incomming: transactions.reduce((acc, val) => {
            const value = val.opearation === "incomming" && val.amount

            if (value) return acc + value
            return acc
        }, 0),
        outgoing: transactions.reduce((acc, val) => {
            const value = val.opearation === "outgouing" && val.amount

            if (value) return acc + value
            return acc
        }, 0),
    }
})

const $balanceByCurrencies = combine(
    currenciesModel.$currencies,
    $filteredTransactions,
    (currencies, transactions) => {
        return currencies.map((currency) => {
            return {
                fill: currency.fill,
                currencyId: currency.id,
                name: currency.name,
                total: transactions.reduce((acc, val) => {
                    const conditon = currency.id === Number(val.currency)
                    if (conditon) return acc + val.amount
                    return acc
                }, 0),
                incomming: transactions.reduce((acc, val) => {
                    const conditon = currency.id === Number(val.currency)

                    if (conditon) {
                        if (val.opearation === "incomming")
                            return acc + val.amount
                        return acc
                    }
                    return acc
                }, 0),
                outgoing: transactions.reduce((acc, val) => {
                    const conditon = currency.id === Number(val.currency)

                    if (conditon) {
                        if (val.opearation !== "incomming")
                            return acc + val.amount
                        return acc
                    }

                    return acc
                }, 0),
            }
        })
    }
)

const $balanceByCategories = combine(
    categoriesModel.$categories,
    $filteredTransactions,
    (categories, transactions) => {
        return categories.map((category) => {
            return {
                categoryId: category.id,
                fill: category.color,
                name: category.name,
                total: transactions.reduce((acc, val) => {
                    const conditon = category.id === Number(val.category)

                    if (conditon) {
                        return acc + val.amount
                    }
                    return acc
                }, 0),
                incomming: transactions.reduce((acc, val) => {
                    const conditon = category.id === Number(val.category)

                    if (conditon) {
                        if (val.opearation === "incomming")
                            return acc + val.amount
                        return acc
                    }
                    return acc
                }, 0),
                outgoing: transactions.reduce((acc, val) => {
                    const conditon = category.id === Number(val.category)

                    if (conditon) {
                        if (val.opearation !== "incomming")
                            return acc + val.amount
                        return acc
                    }
                    return acc
                }, 0),
            }
        })
    }
)
const $balanceDonutChart = combine($balance, (balance) => {
    return [
        {
            label: "приход",
            value: balance.incomming,
            fill: "fill-green-600",
        },
        {
            label: "расход",
            value: balance.outgoing * -1,
            fill: "fill-rose-600",
        },
    ]
})
// При желании можно завести отдельный селектор, не завязанный на react биндинги
const useBalance = () => {
    return useStore($balance)
}

const useBalanceDountSeries = () => {
    return useStore($balanceDonutChart)
}

const useTransactions = () => {
    return useStore($filteredTransactions)
}

const useBalanceByCategories = (keys: any[]) => {
    return useStoreMap({
        store: $balanceByCategories,
        fn: (category) =>
            category.map((item) => ({
                label: item.name,
                value: item.total,
                fill: item.fill,
            })),
        keys: [...keys],
    })
}

const useBalanceByCurrencies = (keys: any[]) => {
    return useStoreMap({
        store: $balanceByCurrencies,
        fn: (currencies) =>
            currencies.map((item) => ({
                label: item.name,
                value: item.total,
                fill: item.fill,
            })),
        keys: [...keys],
    })
}

export const selectors = {
    useBalance,
    useBalanceDountSeries,
    useTransactions,
    useBalanceByCategories,
    useBalanceByCurrencies,
}
export const events = {
    editTransaction,
    removeTransaction,
}
export {
    $totalTransactionAmount,
    $transactions,
    $balance,
    $balanceByCurrencies,
    $balanceByCategories,
    $filteredTransactions,
}
