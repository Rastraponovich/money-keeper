import type { NextPage } from "next"
import { fork, serialize } from "effector"
import { useEvent, useStore, useStoreMap } from "effector-react/scope"
import { PlusIcon } from "@heroicons/react/outline"
import { WidgetBalance, WidgetTransactionsList } from "../widgets"
import { DonutChart } from "../shared/ui"
import {
    BalanceByCategoriesList,
    BalanceByCurrenciesList,
    transactionsModel,
} from "../entities/transactions"
import { NewTransaction } from "../features/new-transaction"
import { CreateTransactionButton } from "../features/new-transaction/ui/create-transaction-button"

const MainPage: NextPage = () => {
    const balance = transactionsModel.selectors.useBalance()

    const balanceByCategories =
        transactionsModel.selectors.useBalanceByCategories([balance.total])
    const BalanceByCurrencies =
        transactionsModel.selectors.useBalanceByCurrencies([balance.total])

    return (
        <main className="px-10 py-4 flex flex-col grow">
            <section className="grid grid-cols-4 grow gap-4 ">
                <div className="col-span-1 flex flex-col space-y-4 self-start">
                    <BalanceByCategoriesList />
                    <BalanceByCurrenciesList />
                </div>
                <div className="col-span-2  flex flex-col bg-white justify-start space-y-4 ">
                    <WidgetBalance />

                    <WidgetTransactionsList />
                </div>
                <div className="col-span-1 flex flex-col space-y-2 self-start">
                    <div className="p-2 shadow-lg rounded">
                        <DonutChart
                            title="по категориям"
                            series={balanceByCategories}
                        />
                    </div>

                    <div className="p-2 shadow-lg rounded">
                        <DonutChart
                            title="по валютам"
                            series={BalanceByCurrencies}
                        />
                    </div>
                </div>
            </section>

            <CreateTransactionButton />
            <NewTransaction />
        </main>
    )
}

export default MainPage

export const getServerSideProps = async () => {
    const scope = fork()
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
