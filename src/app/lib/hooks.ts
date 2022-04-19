import { fork, serialize, Scope } from "effector"
import { useMemo } from "react"

let clientScope: Scope

const initializeScope = (initialData: Record<string, unknown>) => {
    let scope = fork({
        values: {
            ...(clientScope ? serialize(clientScope) : {}),
            ...initialData,
        },
    })

    if (typeof window !== "undefined") {
        clientScope = scope
    }

    return scope
}

export const useScope = (initialData = {}) =>
    useMemo(() => initializeScope(initialData), [initialData])

export const getClientScope = (): Scope | undefined => clientScope
