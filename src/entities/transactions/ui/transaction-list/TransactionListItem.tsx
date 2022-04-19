import { newTransactionModel } from "@/src/features/new-transaction"
import { TTransaction } from "@/src/shared/api"
import clsx from "clsx"
import { useEvent } from "effector-react/scope"
import { memo } from "react"

interface TransactionListItemProps {
    transaction: TTransaction
}

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
    const hanldeClick = useEvent(newTransactionModel.events.selectTransaction)

    return (
        <div
            onClick={() => hanldeClick(transaction.id)}
            className={clsx(
                "flex px-2 py-1 text-white space-x-2 text-sm",
                transaction.opearation === "incomming"
                    ? "bg-green-600"
                    : "bg-rose-600"
            )}
        >
            <span>{transaction.id}</span>
            <span className="grow">{transaction.description}</span>
            <span className="after:ml-1 after:content-['₽']">
                {transaction.amount}
            </span>
            <span>{transaction.date!.split("-").reverse().join("-")}</span>
        </div>
    )
}

export default memo(TransactionListItem)
