import { transactionsModel } from "@/src/entities/transactions"
import { useList } from "effector-react"

export const WidgetByCurrencies = () => {
    const total = transactionsModel.selectors.useBalance()

    return (
        <div className="flex flex-col rounded-lg border space-y-2 drop-shadow-md">
            <h3 className="p-2 bg-blue-400 text-white rounded-t-lg first-letter:uppercase">
                по валютам
            </h3>
            <div className="flex flex-col space-y-2 rounded-b-lg p-2">
                {useList(transactionsModel.$balanceByCurrencies, {
                    keys: [total.total],
                    fn: (currency) => (
                        <div className="flex flex-col">
                            <span>{currency.name}</span>
                            <progress
                                value={currency.total}
                                max={total.total}
                            ></progress>
                        </div>
                    ),
                })}
            </div>
        </div>
    )
}
