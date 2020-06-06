import React, { useState } from 'react';

import classNames from 'classnames';

import { AccordionContext, TAccordionValue } from './accordion-context';

export interface IAccordionProps {
    children: React.ReactNode;
    defaultValue?: TAccordionValue;
    value?: TAccordionValue;
    onChange?: (value: TAccordionValue) => void;
    className?: string;
}

export const Accordion: React.FC<IAccordionProps> = (props: IAccordionProps) => {
    const className: string = classNames('accordion', props.className);
    const [value, setValue] = useState(props.defaultValue || null);

    return (
        <div className={className}>
            <AccordionContext.Provider
                value={{
                    setValue: (nextValue: TAccordionValue): void => {
                        setValue(nextValue);

                        if (props.onChange) {
                            props.onChange(nextValue);
                        }
                    },
                    value: typeof props.value !== 'undefined' ? props.value : value,
                }}
            >
                {props.children}
            </AccordionContext.Provider>
        </div>
    );
};
