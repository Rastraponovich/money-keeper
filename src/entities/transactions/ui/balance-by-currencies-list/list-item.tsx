import Accordion from "@/src/shared/ui/accordion"

interface BalanceByCurrenciesListItemProps {
    item: {
        fill: string | undefined
        currencyId: number
        name: string
        total: number
        incomming: number
        outgoing: number
    }
}

export const BalanceByCurrenciesListItem = ({
    item,
}: BalanceByCurrenciesListItemProps) => {
    return (
        <Accordion
            buttonClassName="flex justify-between px-2 bg-blue-400 text-white w-full"
            panelClassName="flex flex-col px-4 bg-gray-200  text-gray-600 text-sm"
            title={
                <>
                    <span>{item.name}</span>
                    <span className="rubles">{item.total}</span>
                </>
            }
        >
            <ul>
                <li>
                    <span className="italic rubles">
                        приход: {item.incomming}
                    </span>
                </li>
                <li>
                    <span className="italic rubles">
                        расход:{item.outgoing}
                    </span>
                </li>
            </ul>
        </Accordion>
    )
}
