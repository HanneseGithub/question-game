import React, { useState } from 'react';

import classNames from 'classnames';

import { Icon } from '../../icon/icon';

export interface ISelectOption {
    label: string;
    value: string;
}

export interface ISelectProps {
    id: string;
    label: string;
    name: string;
    options: ISelectOption[];
    defaultValue?: string;
    value?: string;
    type?: string;
    attributes?: React.SelectHTMLAttributes<HTMLSelectElement>;
    onChange?: (value: string) => void;
    invalid?: boolean;
    disabled?: boolean;
    error?: string;
    description?: string;
    labelClassName?: string;
    inputClassName?: string;
    modifier?: string;
    className?: string;
}

const Select = (props: ISelectProps): JSX.Element => {
    const [value, setValue] = useState(props.defaultValue);
    const className: string = classNames(
        'select',
        {
            'is-dirty': typeof props.value !== 'undefined' ? props.value : value,
            'is-disabled': props.disabled,
            'is-invalid': props.invalid,
        },
        props.modifier,
        props.className,
    );

    const handleChange: (event: React.FormEvent<HTMLSelectElement>) => void = (event: React.FormEvent<HTMLSelectElement>): void => {
        const nextValue: string = event.currentTarget.value;

        // only set local state value if input is not controlled from parent
        if (typeof props.value === 'undefined') {
            setValue(nextValue);
        }

        if (props.onChange) {
            props.onChange(nextValue);
        }
    };

    const renderOptions: () => JSX.Element[] = (): JSX.Element[] => props.options.map((option: ISelectOption) => (
        <option
            key={option.value}
            value={option.value}
        >
            {option.label}
        </option>
    ));

    const inputClassName: string = classNames('select__input', props.inputClassName);
    const labelClassName: string = classNames('select__label', props.labelClassName);

    return (
        <div className={className}>
            <div className="select__inner">
                <select
                    {...props.attributes}
                    className={inputClassName}
                    id={props.id}
                    name={props.name}
                    disabled={props.disabled}
                    // use local state only when component is not controlled from parent
                    value={typeof props.value !== 'undefined' ? props.value : value}
                    onChange={handleChange}
                >
                    {renderOptions()}
                </select>
                <Icon name="arrow-down" className="select__icon" />
                <label className={labelClassName} htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
            {props.error && (
                <div className="select__error">
                    {props.error}
                </div>
            )}
            {props.description && (
                <div className="select__description">
                    {props.description}
                </div>
            )}
        </div>
    );
};

export default Select;
