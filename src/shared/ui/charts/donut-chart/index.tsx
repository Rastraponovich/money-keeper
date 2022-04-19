import clsx from "clsx"
import { Fragment, memo, useMemo } from "react"
import { useDonutChart } from "@/src/shared/hooks/use-donut-chart"
import { bgcolors } from "../../../lib/helpers"
import { DonutSlice } from "./donut-slice"
import { Transition } from "@headlessui/react"
import { TSeries } from "@/src/shared/api"

interface DonutChartProps {
    title?: string
    series: TSeries[]
    fill?: string
    legendCenter?: boolean
}

export const DonutChart = memo(
    ({ title, series, legendCenter }: DonutChartProps) => {
        //@ts-ignore
        const [items, slices]: [FilteredSeries[], Slice[]] = useDonutChart({
            series,
        })
        const size = useMemo(() => 100, [])

        const noData = series.reduce((acc, val) => acc + val.value, 0) <= 0

        return (
            <div className={clsx("flex-[1_1_75%] p-4 flex-col space-y-2")}>
                {title && (
                    <div className="text-center text-base first-letter:uppercase">
                        {title}
                    </div>
                )}

                <Transition show={!noData} appear as={Fragment}>
                    <div className="items-center flex">
                        <svg viewBox={`0 0 ${size} ${size}`}>
                            {slices.map((slice: any) => (
                                <DonutSlice
                                    fill={slice.fill}
                                    i={slice.i}
                                    key={slice.i}
                                    commands={slice.commands}
                                />
                            ))}
                        </svg>
                    </div>
                </Transition>
                <ul
                    className={clsx(
                        "donut-chart-legend flex flex-col space-y-2 ",
                        legendCenter && "items-center"
                    )}
                >
                    {items.map(({ value, percent, label, fill }) => (
                        <li
                            key={`${value}-${label}`}
                            className={clsx(
                                fill ? bgcolors[fill] : "before:bg-blue-600",
                                " space-x-2 text-sm flex items-center"
                            )}
                        >
                            <span>{label}</span>
                            <span>({Math.round(percent * 100)}%)</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
)
