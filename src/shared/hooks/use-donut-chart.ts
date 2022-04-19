import { colors } from "@/src/shared/lib/helpers"
import { useMemo } from "react"

import { MakeSegment, useDonutChartProps, Slice, FilteredSeries } from "../api"
import {
    radiusToDegrees,
    angleForArcLength,
    coords,
    computePercentages,
} from "../lib/utils"

/**
 * The viewBox size. Coordinates are computed within this coordinate space
 */
const size = 100

/**
 * The center of the viewBox, center of the chart
 */
const center = size / 2

/**
 * The diameter of the chart's inner hole in local coordinate space units
 */
const hole = 55

/**
 * The thickness of the chart segments for the given size and hole
 */
const thickness = (size - hole) / 2

/**
 * The outer radius of the chart
 */
const radiusOuter = size / 2

/**
 * The inner radius of the chart
 */
const radiusInner = radiusOuter - thickness

/**
 * The size of the gap between chart segments, in local coordinate space units
 */
const gapSize = 1

/**
 * Compute the angle offset required to establish the gaps between segments at the inner edge
 */
const gapAngleOffsetInner = radiusToDegrees(
    angleForArcLength(gapSize, radiusInner)
)

/**
 * Compute the angle offset required to establish the gaps between segments at the outer edge
 */
const gapAngleOffsetOuter = radiusToDegrees(
    angleForArcLength(gapSize, radiusOuter)
)

/**
 * The minimum angle that won't be swallowed by the gap offsets at the inner edge.
 * Used to compute the minimum value that won't get swallowed (minimumValue defined below)
 */
const minimumAngleDeg = radiusToDegrees(
    angleForArcLength(gapSize * 2, radiusInner)
)

/**
 * The minimum value that won't get swallowed by the gap offsets at the inner edge
 */
const minimumValue = minimumAngleDeg / 360

const makeSegment: MakeSegment = (
    { paths, subtotal },
    { fill: color, percent },
    i
) => {
    const startAngle = subtotal * 360 + 90 // +90 so we start at 12 o'clock
    const endAngle = startAngle + percent * 360
    // no gaps for values beneath the minimum threshold
    const useGap = percent >= minimumValue
    const innerGap = useGap ? gapAngleOffsetInner : 0
    const outerGap = useGap ? gapAngleOffsetOuter : 0
    const startAngleInner = startAngle + innerGap
    const startAngleOuter = startAngle + outerGap
    const endAngleInner = endAngle - innerGap
    const endAngleOuter = endAngle - outerGap
    const [x1, y1] = coords(startAngleInner, radiusInner, center) // start point on inner circle
    const [x2, y2] = coords(startAngleOuter, radiusOuter, center) // start point on outer circle
    const [x3, y3] = coords(endAngleOuter, radiusOuter, center) // end point on outer circle
    const [x4, y4] = coords(endAngleInner, radiusInner, center) // end point on inner circle

    const largeArc = percent > 0.5 ? 1 : 0
    const sweepOuter = 1
    const sweepInner = 0

    const commands = [
        // move to start angle coordinate, inner radius
        `M${x1} ${y1}`,
        // line to start angle coordinate, outer radius
        `L${x2} ${y2}`,
        // arc to end angle coordinate, outer radius
        `A${radiusOuter} ${radiusOuter} 0 ${largeArc} ${sweepOuter} ${x3} ${y3}`,
        // line to end angle coordinate, inner radius
        `L${x4} ${y4}`,
        // arc back to start angle coordinate, inner radius
        `A${radiusInner} ${radiusInner} 0 ${largeArc} ${sweepInner} ${x1} ${y1}`,
    ]

    const fill = color || colors[i % colors.length]

    paths.push({ fill, commands, i })

    return {
        paths,
        subtotal: subtotal + percent,
    }
}
export const useDonutChart = ({
    series,
}: useDonutChartProps): [FilteredSeries[], Slice[]] => {
    const items = useMemo(() => computePercentages(series), [series])

    const slices = useMemo(() => {
        // @ts-ignore
        return items.reduce(makeSegment, {
            paths: [],
            subtotal: 0,
        }).paths!
    }, [items, makeSegment])

    return [items, slices]
}
