import {
    DegreesToRadius,
    RadiusToDegrees,
    AngleForArcLength,
    Coords,
    ComputePercentages,
} from "@/src/shared/api"
import dayjs from "dayjs"

export const numberWithSpaces = (value: number): string => {
    // const regexp = /^\-?[0-9]*$/

    // if (!regexp.test(value.toString())) return value.toString().slice(0, -1)

    // return value.toString()
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const timeStampToDate = (value: string | undefined): string => {
    return dayjs(value).format("YYYY-MM-DD")
}

export const degreesToRadius: DegreesToRadius = (degrees) =>
    degrees * (Math.PI / 180)

export const radiusToDegrees: RadiusToDegrees = (radius) =>
    radius / (Math.PI / 180)

export const angleForArcLength: AngleForArcLength = (arcLength, atRadius) =>
    arcLength / atRadius

export const coords: Coords = (degrees, r, center) => {
    const radius = degreesToRadius(degrees)
    return [center - Math.cos(radius) * r, center - Math.sin(radius) * r]
}

export const computePercentages: ComputePercentages = (series) => {
    const filtered = (series || []).filter(({ value }) => value > 0)
    const total = filtered.reduce((t, { value = 0 }) => t + value, 0)

    return filtered.map((item) => ({
        ...item,
        percent: item.value / total,
    }))
}
