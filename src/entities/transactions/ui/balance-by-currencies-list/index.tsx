import Accordion from "@/src/shared/ui/accordion"
import { useList } from "effector-react/scope"
import { transactionsModel } from "../.."
import { BalanceByCurrenciesListItem } from "./list-item"

export const BalanceByCurrenciesList = () => {
    const balance = transactionsModel.selectors.useBalance()

    const { $balanceByCurrencies } = transactionsModel

    return (
        <Accordion
            className="mb-2 flex flex-col"
            rounded
            buttonClassName="bg-blue-600 hover:bg-blue-400 duration-150 text-white   not-prose"
            panelClassName="w-full"
            title={<h3 className="px-2 py-1 first-letter:uppercase">валюты</h3>}
            component={"div"}
        >
            {useList($balanceByCurrencies, {
                keys: [balance.total],
                fn: (item) => <BalanceByCurrenciesListItem item={item} />,
            })}
        </Accordion>
    )
}
