import Accordion from "@/src/shared/ui/accordion"

interface BalanceByCategoriesListItemProps {
    item: {
        categoryId: number
        fill: string | undefined
        name: string
        total: number
        incomming: number
        outgoing: number
    }
}

export const BalanceByCategoriesListItem = ({
    item,
}: BalanceByCategoriesListItemProps) => {
    return (
        <Accordion
            buttonClassName="flex justify-between px-2 bg-blue-400 text-white w-full"
            panelClassName="flex flex-col px-4 bg-gray-200  text-gray-600 text-sm"
            title={
                <>
                    <span>{item.name} </span>
                    <span className="rubles">{item.total}</span>
                </>
            }
        >
            <ul className="flex flex-col">
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
