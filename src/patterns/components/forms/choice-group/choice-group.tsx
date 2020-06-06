import React, { useState } from 'react';

import classNames from 'classnames';

import { Check, ICheckProps } from '../check';
import { Radio, IRadioProps } from '../radio';

if (process.env.webpack) {
    require('./choice-group.scss');
}

export type TChoiceGroupValue = string | string[];

export interface IChoiceGroupProps {
    type: 'radio' | 'check';
    choices: (IRadioProps | ICheckProps)[];
    label: string;
    defaultValue?: TChoiceGroupValue;
    value?: TChoiceGroupValue;
    onChange?: (value: TChoiceGroupValue) => void;
    error?: string;
    description?: string;
    invalid?: boolean;
    modifier?: string;
    className?: string;
}

const getInitialValue: (type: 'check' | 'radio', value?: TChoiceGroupValue) => TChoiceGroupValue = (type: 'check' | 'radio', value?: TChoiceGroupValue): TChoiceGroupValue => {
    if (value) {
        return value;
    } else if (type === 'check') {
        return [];
    } else {
        return '';
    }
};

const ChoiceGroup: React.FC<IChoiceGroupProps> = (props: IChoiceGroupProps) => {
    const [value, setValue] = useState(getInitialValue(props.type, props.defaultValue));
    const className: string = classNames(
        'choice-group',
        {
            'is-invalid': props.invalid,
        },
        props.modifier,
        props.className,
    );
    const currentValue: TChoiceGroupValue = typeof props.value !== 'undefined' ? props.value : value;

    const isChoiceChecked: (value: string) => boolean = (itemValue: string): boolean => {
        if (props.type === 'check') {
            return currentValue.indexOf(itemValue) !== -1;
        } else {
            return currentValue === itemValue;
        }
    };

    const getNextValue: (itemValue: string, checked: boolean) => TChoiceGroupValue = (itemValue: string, checked: boolean): TChoiceGroupValue => {
        if (Array.isArray(currentValue)) {
            if (checked) {
                return [
                    ...currentValue,
                    itemValue,
                ];
            }

            return [...currentValue].filter((item: string) => item !== itemValue);
        }

        return itemValue;
    };

    const handleChange: (value: string, checked: boolean) => void = (itemValue: string, checked: boolean): void => {
        const nextValue: TChoiceGroupValue = getNextValue(itemValue, checked);

        if (typeof props.value === 'undefined') {
            setValue(nextValue);
        }

        if (props.onChange) {
            props.onChange(nextValue);
        }
    };

    const renderChoices: () => JSX.Element[] = (): JSX.Element[] => {
        const ChoiceType: typeof Check | typeof Radio = props.type === 'check' ? Check : Radio;

        return props.choices.map((item: IRadioProps | ICheckProps) => {
            const handleChangeWrapper: (checked: boolean) => void = (checked: boolean) => handleChange(item.value, checked);

            return (
                <ChoiceType
                    {...item}
                    key={item.id}
                    checked={isChoiceChecked(item.value)}
                    onChange={handleChangeWrapper}
                    className="choice-group__item"
                />
            );
        });
    };

    return (
        <fieldset className={className}>
            <legend className="choice-group__label">{props.label}</legend>
            <div className="choice-group__inner">
                {renderChoices()}
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
