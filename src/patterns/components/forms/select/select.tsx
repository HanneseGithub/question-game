import React, { useState } from 'react';

import classNames from 'classnames';

import Icon from '@icon';

if (process.env.webpack) {
    require('./select.scss');
}

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

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
    const [value, setValue] = useState(props.defaultValue);
    const className: string = classNames(
        'select',
        {
            'is-dirty': typeof props.value !== 'undefined' ? props.value : value,
            'is-invalid': props.invalid,
            'is-disabled': props.disabled,
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

    const renderError: () => JSX.Element = (): JSX.Element => {
        return (
            <div className="select__error">
                {props.error}
            </div>
        );
    };

    const renderDescription: () => JSX.Element = (): JSX.Element => {
        return (
            <div className="select__description">
                {props.description}
            </div>
        );
    };

    const renderLabel: () => JSX.Element = (): JSX.Element => {
        const labelClassName: string = classNames('select__label', props.labelClassName);

        return (
            <label className={labelClassName} htmlFor={props.id}>
                {props.label}
            </label>
        );
    };

    const renderOptions: () => JSX.Element[] = (): JSX.Element[] => {
        return props.options.map((option: ISelectOption) => {
            return (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            );
        });
    };

    const renderInput: () => JSX.Element = (): JSX.Element => {
        const inputClassName: string = classNames('select__input', props.inputClassName);

        return (
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
        );
    };

    return (
        <div className={className}>
            <div className="select__inner">
                {renderInput()}
                <Icon name="arrow-down" className="select__icon" />
                {renderLabel()}
            </div>
            {props.error && renderError()}
            {props.description && renderDescription()}
        </div>
    );
};

export default Select;
