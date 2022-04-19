import { DateFilters } from "@/src/features/date-filters"

export const Header = () => {
    return (
        <header className="grid grid-cols-3 px-4 py-2 bg-blue-600 text-white drop-shadow-md items-center">
            <h2 className="first-letter:uppercase  prose-2xl">капиталОчка</h2>
            <DateFilters />
        </header>
    )
}
