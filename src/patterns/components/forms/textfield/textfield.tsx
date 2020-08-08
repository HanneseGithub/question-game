import React, { useState } from 'react';

import classNames from 'classnames';

export interface ITextFieldProps {
    id: string;
    label: string;
    name: string;
    defaultValue?: string;
    value?: string;
    type?: string;
    attributes?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: (value: string) => void;
    element?: 'textarea';
    invalid?: boolean;
    disabled?: boolean;
    error?: string;
    description?: string;
    labelClassName?: string;
    inputClassName?: string;
    modifier?: string;
    className?: string;
}

const TextField = (props: ITextFieldProps): JSX.Element => {
    const {
        defaultValue = '',
        type = 'text',
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const className: string = classNames(
        'textfield',
        {
            'is-dirty': typeof props.value !== 'undefined' ? props.value : value,
            'is-disabled': props.disabled,
            'is-focused': isFocused,
            'is-invalid': props.invalid,
        },
        props.modifier,
        props.className,
    );

    const handleChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const nextValue: string = event.currentTarget.value;

        if (typeof props.value === 'undefined') {
            setValue(nextValue);
        }

        if (props.onChange) {
            props.onChange(nextValue);
        }
    };

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (): void => {
        setIsFocused(false);
    };

    const inputClassName: string = classNames('textfield__input', props.inputClassName);
    const InputElement: 'input' | 'textarea' = props.element || 'input';
    const labelClassName: string = classNames('textfield__label', props.labelClassName);

    return (
        <div className={className}>
            <div className="textfield__inner">
                <InputElement
                    {...props.attributes}
                    className={inputClassName}
                    type={props.element === 'textarea' ? undefined : type}
                    id={props.id}
                    name={props.name}
                    disabled={props.disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    // use local state only when component is not controlled from parent
                    value={typeof props.value !== 'undefined' ? props.value : value}
                    onChange={handleChange}
                />
                <label className={labelClassName} htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
            {props.error && (
                <div className="textfield__error">
                    {props.error}
                </div>
            )}
            {props.description && (
                <div className="textfield__description">
                    {props.description}
                </div>
            )}
        </div>
    );
};

export default TextField;
