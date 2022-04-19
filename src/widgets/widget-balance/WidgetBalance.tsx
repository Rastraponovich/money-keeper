import { DonutChart } from "@/src/shared/ui"
import { transactionsModel } from "@/src/entities/transactions"
import { WidgetBalanceCurrenciesList } from "./WidgetBalanceCurrenciesList"

export const WidgetBalance = () => {
    const balance = transactionsModel.selectors.useBalance()
    const series = transactionsModel.selectors.useBalanceDountSeries()

    return (
        <div className="flex flex-col  rounded-lg  justify-start prose  ">
            <h2 className="first-letter:uppercase text-white text-2xl text-center bg-green-600 px-2 py-1  rounded-t-lg my-0">
                общая статистика
            </h2>

            <div className="flex justify-between p-2 shadow-lg rounded ">
                <div className="flex flex-col w-3/4">
                    <h3 className="first-letter:uppercase rubles">
                        баланс: {balance.total}
                    </h3>
                    <h5 className="first-letter:uppercase rubles">
                        поступления: {balance.incomming}
                    </h5>
                    <h5 className="first-letter:uppercase rubles">
                        расходы: {balance.outgoing}
                    </h5>
                    <WidgetBalanceCurrenciesList />
                </div>
                <DonutChart series={series} />
            </div>
        </div>
    )
}
