import { $balanceByCurrencies } from "@/src/entities/transactions/model"
import { useList } from "effector-react"

export const WidgetBalanceCurrenciesList = () => {
    return (
        <>
            {useList($balanceByCurrencies, (curr) => (
                <h5 className="rubles">
                    {curr.name} : {curr.total}
                </h5>
            ))}
        </>
    )
}
