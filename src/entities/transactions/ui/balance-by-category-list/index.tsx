import Accordion from "@/src/shared/ui/accordion"
import { useList } from "effector-react/scope"
import { transactionsModel } from "../.."
import { BalanceByCategoriesListItem } from "./list-item"

export const BalanceByCategoriesList = () => {
    const balance = transactionsModel.selectors.useBalance()
    const { $balanceByCategories } = transactionsModel

    return (
        <Accordion
            component={"div"}
            className="mb-2 flex flex-col shadow-lg"
            buttonClassName="bg-blue-600 hover:bg-blue-400 duration-150 text-white   not-prose"
            rounded
            title={
                <h3 className="px-2 py-1 first-letter:uppercase">категории</h3>
            }
        >
            {useList($balanceByCategories, {
                keys: [balance.total],
                fn: (item) => <BalanceByCategoriesListItem item={item} />,
            })}
        </Accordion>
    )
}
