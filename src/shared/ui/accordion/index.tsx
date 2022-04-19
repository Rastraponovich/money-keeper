import { Disclosure } from "@headlessui/react"
import clsx from "clsx"
import { ElementType, memo, ReactNode } from "react"

interface AccordionProps {
    children: ReactNode
    title: string | ReactNode
    panelClassName?: string
    buttonClassName?: string
    component?: ElementType
    rounded?: boolean
    className?: string
}
const Accordion = ({
    children,
    title,
    panelClassName,
    buttonClassName,
    component: Component,
    rounded,
    className,
}: AccordionProps) => {
    return (
        <Disclosure as={Component} className={className}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={clsx(
                            buttonClassName,
                            rounded
                                ? open
                                    ? "rounded-t-lg"
                                    : "rounded-lg"
                                : null
                        )}
                    >
                        {title}
                    </Disclosure.Button>
                    <Disclosure.Panel className={clsx(panelClassName)}>
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
export default memo(Accordion)
