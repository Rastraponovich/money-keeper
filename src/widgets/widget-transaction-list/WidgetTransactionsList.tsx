import { TransactionList, transactionsModel } from "@/src/entities/transactions"

export const WidgetTransactionsList = () => {
    const transactions = transactionsModel.selectors.useTransactions()

    return (
        <div className="flex flex-col rounded-lg border">
            <div className="flex justify-between bg-blue-600 duration-150 hover:bg-blue-400 text-white p-2 rounded-t-lg items-center">
                <h2 className="first-letter:uppercase">операции</h2>
                <span className="text-sm text-gray-200">
                    кол-во: {transactions.length}
                </span>
            </div>
            <TransactionList />
        </div>
    )
}
