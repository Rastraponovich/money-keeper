import clsx from "clsx"
import { memo, useLayoutEffect } from "react"
import { useEvent, useList } from "effector-react"

import { ListActions } from "../list-actions"
import { newTransactionModel } from "../.."
import { currenciesModel } from "@/src/entities/currencies"

import { Transition } from "@headlessui/react"
import { PlusIcon, MinusIcon } from "@heroicons/react/outline"

import Select from "@/src/shared/ui/select"
import TextInput from "@/src/shared/ui/text-input"

export const CurreciesList = memo(() => {
    const showAddCurrency = currenciesModel.selectors.useShowAddCurrency()
    const newCurrency = currenciesModel.selectors.useNewCurrency()
    const currentTransaction =
        newTransactionModel.selectors.useCurrentTransaction()
    const readonly = newTransactionModel.selectors.useReadOnlyTransaction()

    const handleToggleShowAddCurrency = useEvent(
        currenciesModel.events.toggleAddCurrency
    )
    const handleSelect = useEvent(
        newTransactionModel.events.setSelectNewTransaction
    )
    const handleChange = useEvent(currenciesModel.events.setNewCurrency)

    useLayoutEffect(() => {
        if (showAddCurrency) return () => handleToggleShowAddCurrency()
    }, [])

    return (
        <div className="flex space-y-2 flex-col">
            <div className="flex space-x-4">
                <Select
                    title="валюта"
                    id="currency"
                    disabled={readonly}
                    onChange={handleSelect}
                    value={currentTransaction.currency}
                    error={currentTransaction.currency === 0}
                    grow
                >
                    <option value={0}>укажите валюту</option>
                    {useList(currenciesModel.$currencies, {
                        fn: (currency) => (
                            <option value={currency.id}>{currency.name}</option>
                        ),
                    })}
                </Select>
                <button
                    type="button"
                    className={clsx(
                        "drop-shadow-md p-2 bg-green-600 rounded-full text-white self-end",
                        showAddCurrency && "bg-rose-600"
                    )}
                    onClick={handleToggleShowAddCurrency}
                >
                    {!showAddCurrency ? (
                        <PlusIcon className="h-4 w-4" />
                    ) : (
                        <MinusIcon className="h-4 w-4" />
                    )}
                </button>
            </div>
            <Transition
                appear
                show={showAddCurrency}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="flex flex-col bg-gray-50 p-2 rounded space-y-2">
                    <TextInput
                        type="text"
                        id="name"
                        placeholder="новая валюта"
                        title="новая валюта"
                        value={newCurrency.name}
                        onChange={handleChange}
                    />
                    <ListActions
                        onClose={currenciesModel.events.toggleAddCurrency}
                        onSave={currenciesModel.events.saveNewCurrency}
                    />
                </div>
            </Transition>
        </div>
    )
})
