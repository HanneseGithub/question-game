import React, { useState } from 'react';

import classNames from 'classnames';

import {
    AccordionContext,
    TAccordionSingleValue,
    TAccordionMultipleValue,
} from './accordion-context';

export interface IAccordionBase {
    children: React.ReactNode;
    className?: string;
}

export interface IAccordionSingle extends IAccordionBase {
    multiple?: false;
    defaultValue?: TAccordionSingleValue;
    value?: TAccordionSingleValue;
    onChange?: (value: TAccordionSingleValue) => void;
}

export interface IAccordionMultiple extends IAccordionBase {
    multiple: true;
    defaultValue?: TAccordionMultipleValue;
    value?: TAccordionMultipleValue;
    onChange?: (value: TAccordionMultipleValue) => void;
}

export type IAccordionProps = IAccordionSingle | IAccordionMultiple;

export const Accordion: React.FC<IAccordionProps> = (props: IAccordionProps) => {
    const className: string = classNames('accordion', props.className);
    const [value, setValue] = useState(getValue(props.defaultValue));

    return (
        <div className={className}>
            <AccordionContext.Provider
                value={{
                    toggle: (id: string): void => {
                        const nextValue = getNextValue(value, id, props.multiple);

                        if (typeof props.value === 'undefined') {
                            setValue(nextValue);
                        }
                        if (props.onChange) {
                            if (props.multiple) {
                                props.onChange(nextValue);
                            } else {
                                props.onChange(nextValue.length ? nextValue[0] : null);
                            }
                        }
                    },
                    value: getValue(typeof props.value !== 'undefined' ? props.value : value),
                }}
            >
                {props.children}
            </AccordionContext.Provider>
        </div>
    );
};

const getValue = (value?: string | string[] | null): string[] => {
    if (!value) {
        return [];
    }

    if (typeof value === 'string') {
        return [value];
    }

    return value;
};

const getNextValue = (value: string[], id: string, multiple: boolean = false): string[] => {
    if (multiple) {
        return value.includes(id) ? value.filter((i) => i !== id) : [...value, id];
    }

    return value.includes(id) ? value.filter((i) => i !== id) : [id];
};
