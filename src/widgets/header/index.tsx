import { transactionsModel } from "@/src/entities/transactions"
import DateInput from "@/src/shared/ui/date-input"
import { useStore } from "effector-react"
import { useEvent } from "effector-react/scope"

export const Header = () => {
    const filteredDates = useStore(transactionsModel.$filteredDates)

    const handleChange = useEvent(transactionsModel.events.setFilteredDates)
    return (
        <header className="flex px-4 py-2 bg-blue-600 text-white drop-shadow-md items-center">
            <h2 className="first-letter:uppercase  prose-2xl">капиталОчка</h2>
            <div className="flex space-x-4 grow ml-8">
                <DateInput
                    label="startDate"
                    type="date"
                    id="startDate"
                    value={filteredDates.startDate}
                    onChange={handleChange}
                />
                <DateInput
                    label="endDate"
                    type="date"
                    id="endDate"
                    value={filteredDates.endDate}
                    onChange={handleChange}
                />
            </div>
        </header>
    )
}
