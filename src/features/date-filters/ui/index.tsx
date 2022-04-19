import DateInput from "@/src/shared/ui/date-input"
import { useEvent } from "effector-react/scope"
import { filteredDatesModel } from ".."

export const DateFilters = () => {
    const filteredDates = filteredDatesModel.selectors.useFilteredDates()
    const handleChange = useEvent(filteredDatesModel.events.setFilteredDates)

    return (
        <div className="flex space-x-8 grow ">
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
    )
}
