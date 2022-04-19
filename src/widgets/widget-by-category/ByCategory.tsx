import { transactionsModel } from "@/src/entities/transactions"
import { useList, useStore } from "effector-react"

export const WidgetByCategory = () => {
    const total = transactionsModel.selectors.useBalance()

    return (
        <div className="flex flex-col space-y-2 border rounded-lg drop-shadow-md">
            <h3 className="bg-blue-400 text-white first-letter:uppercase p-2 rounded-t-lg">
                по категориям
            </h3>
            <div className="p-2 ">
                {useList(transactionsModel.$balanceByCategories, {
                    keys: [total.total],
                    fn: (category) => (
                        <div className="flex flex-col">
                            <span>{category.name}</span>

                            <progress
                                value={category.incomming}
                                max={total.total}
                            ></progress>
                        </div>
                    ),
                })}
            </div>
        </div>
    )
}
