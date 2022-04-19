export type TCurrency = {
    id: number
    name: string
    altName: string
    amount: number
    fill?: string
}

export type TCategory = {
    id: number
    name: string
    image?: string
    altName?: string
    color?: string
}

export type TTransactionOperation = "incomming" | "outgouing"
export type TTransactionState = "inprogress" | "done" | "cancel"

export type TTransaction = {
    id: number
    date?: string
    currency: TCurrency["id"]
    category: TCategory["id"]
    amount: number
    opearation: TTransactionOperation
    state: TTransactionState
    description: string
}

export interface MakeSegment {
    (
        acc: {
            paths: Slice[]
            subtotal: number
        },
        val: {
            percent: number
            fill: string
        },
        i: number
    ): MakeSegmentResult
}

type MakeSegmentResult = {
    paths: Slice[]
    subtotal: number
}

export type Slice = { fill: string; commands: any[]; i: number }

export interface useDonutChartProps {
    series: TSeries[]
}
export type TSeries = {
    label: string
    value: number
    fill?: string
}

export interface DegreesToRadius {
    (degrees: number): number
}
export interface RadiusToDegrees {
    (degrees: number): number
}

export interface AngleForArcLength {
    (arcLength: number, atRadius: number): number
}
export interface Coords {
    (deg: number, r: number, center: number): [number, number]
}

export interface FilteredSeries extends TSeries {
    percent: number
    paths?: Slice[]
}

export interface ComputePercentages {
    (series: TSeries[]): FilteredSeries[]
}
