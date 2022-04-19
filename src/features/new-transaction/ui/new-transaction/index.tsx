import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { useEvent } from "effector-react"
import { ChangeEvent, Fragment } from "react"

import { CurreciesList } from "../currencies-list"
import { CategoriesList } from "../categories-list"
import { NewTransactionActions } from "../transacrion-actions"
import { newTransactionModel } from "../.."
import Toggle from "@/src/shared/ui/toggle"
import TextInput from "@/src/shared/ui/text-input"

export const NewTransaction = () => {
    const {
        useReadOnlyTransaction,
        useCurrentTransaction,
        useShowTransactionWindow,
    } = newTransactionModel.selectors

    const currentTransaction = useCurrentTransaction()
    const readonly = useReadOnlyTransaction()
    const showTransactionWindow = useShowTransactionWindow()

    const handleClose = useEvent(
        newTransactionModel.events.cancelCreateTransaction
    )
    const onSubmit = useEvent(newTransactionModel.events.saveTransaction)
    const handleSetValue = useEvent(
        newTransactionModel.events.setNewTransaction
    )
    const handleSetAmount = useEvent(
        newTransactionModel.events.setAmountNewTransaction
    )
    const handleToggleOperationType = useEvent(
        newTransactionModel.events.toggleOperationType
    )

    const handleGuardAmount = (e: ChangeEvent<HTMLInputElement>) => {
        // const regexp = /^(-?[0-9]\d*(\.\d*[0-9]$)?|-?0\.\d*[1-9])$/
        // /^[-]?\d+(\.\d+)?$/

        const reg = /^-?\d+\.?\d*?$/g
        const reg2 = /[^0-9]$/

        const num = e.target.value.replace(reg2, "")

        handleSetAmount({
            ...e,
            target: { ...e.target, id: e.target.id, value: num },
        })
    }

    const handleSetDate = (e: ChangeEvent<HTMLInputElement>) => {
        handleSetValue(e)
    }
    return (
        <Transition appear show={showTransactionWindow} as={Fragment}>
            <Dialog
                as="aside"
                className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center"
                onClose={handleClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-700/70" />
                </Transition.Child>

                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="inline-block w-full max-w-md  rounded-2xl drop-shadow-lg overflow-hidden text-left align-middle transition-all transform bg-tranpsarent ">
                        <div
                            className={clsx(
                                "relative h-36  rounded-bl-4xl rounded-t-lg flex justify-center pt-5",
                                currentTransaction.opearation === "incomming"
                                    ? "bg-green-600"
                                    : "bg-rose-600"
                            )}
                        >
                            <svg
                                className="absolute bottom-0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                            >
                                <path
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                ></path>
                            </svg>
                            <span className="text-3xl text-white first-letter:uppercase z-50 subpixel-antialiased drop-shadow-xl">
                                {currentTransaction.opearation === "incomming"
                                    ? "приход"
                                    : "расход"}
                            </span>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="p-4 flex flex-col space-y-2 bg-white"
                        >
                            <TextInput
                                title="назначение"
                                type="text"
                                value={currentTransaction.description}
                                id="description"
                                required
                                disabled={readonly}
                                onChange={handleSetValue}
                                placeholder="назначение"
                                error={
                                    currentTransaction.description.length === 0
                                }
                                errorText="не заполнено"
                            />
                            <div className="flex space-x-2 items-center py-2">
                                <span
                                    className={clsx(
                                        currentTransaction.opearation ===
                                            "incomming"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    )}
                                >
                                    {currentTransaction.opearation ===
                                    "incomming"
                                        ? "приход"
                                        : "расход"}
                                </span>
                                <Toggle
                                    onChange={handleToggleOperationType}
                                    disabled={readonly}
                                    enabled={
                                        currentTransaction.opearation ===
                                        "incomming"
                                    }
                                />
                            </div>
                            <div className="flex justify-between space-x-2">
                                <TextInput
                                    title="сумма"
                                    type="text"
                                    disabled={readonly}
                                    value={currentTransaction.amount!}
                                    id="amount"
                                    onChange={handleGuardAmount}
                                    placeholder="введите сумму"
                                    required
                                    error={currentTransaction.amount === null}
                                    errorText="не заполнено"
                                />
                                <TextInput
                                    title="дата операции"
                                    type="date"
                                    disabled={readonly}
                                    value={currentTransaction.date}
                                    id="date"
                                    onChange={handleSetDate}
                                    placeholder="дата операции"
                                />
                            </div>

                            <CategoriesList />
                            <CurreciesList />
                            <NewTransactionActions />
                        </form>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
