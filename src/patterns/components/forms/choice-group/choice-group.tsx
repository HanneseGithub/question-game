import React, { useState } from 'react';

import classNames from 'classnames';

import { Check, ICheckProps } from '../check';
import { Radio, IRadioProps } from '../radio';

export type TCheckGroupValue = string[] | null;
export type TRadioGroupValue = string | null;

export interface IChoiceGroupBase {
    label: string;
    error?: string;
    description?: string;
    invalid?: boolean;
    modifier?: string;
    className?: string;
}

export interface ICheckGroupProps extends IChoiceGroupBase {
    type: 'check';
    choices: ICheckProps[];
    defaultValue?: TCheckGroupValue;
    value?: TCheckGroupValue;
    onChange?: (value: TCheckGroupValue) => void;
}

export interface IRadioGroupProps extends IChoiceGroupBase {
    type: 'radio';
    choices: IRadioProps[];
    defaultValue?: TRadioGroupValue;
    value?: TRadioGroupValue;
    onChange?: (value: TRadioGroupValue) => void;
}

export type IChoiceGroupProps = IRadioGroupProps | ICheckGroupProps;

const ChoiceGroup: React.FC<IChoiceGroupProps> = (props: IChoiceGroupProps) => {
    const [value, setValue] = useState(getValue(props.defaultValue));
    const isControlled = typeof props.value !== 'undefined';
    const className: string = classNames(
        'choice-group',
        {
            'is-invalid': props.invalid,
        },
        props.modifier,
        props.className,
    );
    const currentValue = getValue(isControlled ? props.value : value);

    const handleChange = (itemValue: string): void => {
        const nextValue = getNextValue(currentValue, itemValue, props.type === 'check');

        if (!isControlled) {
            setValue(nextValue);
        }

        if (props.onChange) {
            if (props.type === 'check') {
                props.onChange(nextValue);
            } else {
                props.onChange(nextValue.length ? nextValue[0] : null);
            }
        }
    };

    const ChoiceType = props.type === 'check' ? Check : Radio;

    return (
        <fieldset className={className}>
            <legend className="choice-group__label">{props.label}</legend>
            <div className="choice-group__inner">
                {props.choices.map((item: IRadioProps | ICheckProps) => {
                    const handleChangeWrapper = (): void => handleChange(item.value);

                    return (
                        <ChoiceType
                            {...item}
                            key={item.id}
                            checked={currentValue.includes(item.value)}
                            onChange={handleChangeWrapper}
                            className="choice-group__item"
                        />
                    );
                })}
            </div>
            {props.error && (
                <div className="choice-group__error">
                    {props.error}
                </div>
            )}
            {props.description && (
                <div className="choice-group__description">
                    {props.description}
                </div>
            )}
        </fieldset>
    );
};

export default ChoiceGroup;

const getValue = (value?: TRadioGroupValue | TCheckGroupValue): string[] => {
    if (!value) {
        return [];
    }
    if (typeof value === 'string') {
        return [value];
    }

    return value;
};

const getNextValue = (currentValue: string[], itemValue: string, multiple: boolean = false): string[] => {

    if (multiple) {
        return currentValue.includes(itemValue) ? currentValue.filter((i) => i !== itemValue) : [...currentValue, itemValue];
    }

    return currentValue.includes(itemValue) ? currentValue.filter((i) => i !== itemValue) : [itemValue];
};
