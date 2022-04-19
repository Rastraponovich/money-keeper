import { transactionsModel } from "@/src/entities/transactions"
import { useList } from "effector-react"
import TransactionListItem from "./TransactionListItem"

export const TransactionList = () => {
    const transactions = transactionsModel.selectors.useTransactions()
    const { $filteredTransactions } = transactionsModel

    return (
        <div className="flex flex-col rounded-b-lg">
            {useList($filteredTransactions, {
                keys: [transactions.length],
                fn: (transaction) => (
                    <TransactionListItem transaction={transaction} />
                ),
            })}
            {transactions.length === 0 && (
                <div className="py-4 px-2">
                    <span>no transactions</span>
                </div>
            )}
        </div>
    )
}
