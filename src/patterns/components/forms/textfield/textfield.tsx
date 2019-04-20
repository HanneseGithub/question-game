import React, { useState } from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./textfield.scss');
}

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

const TextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.defaultValue);
    const className: string = classNames(
        'textfield',
        {
            'is-dirty': typeof props.value !== 'undefined' ? props.value : value,
            'is-focused': isFocused,
            'is-invalid': props.invalid,
            'is-disabled': props.disabled,
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

    const handleFocus: () => void = (): void => {
        setIsFocused(true);
    };

    const handleBlur: () => void = (): void => {
        setIsFocused(false);
    };

    const renderError: () => JSX.Element = (): JSX.Element => {
        return (
            <div className="textfield__error">
                {props.error}
            </div>
        );
    };

    const renderDescription: () => JSX.Element = (): JSX.Element => {
        return (
            <div className="textfield__description">
                {props.description}
            </div>
        );
    };

    const renderLabel: () => JSX.Element = (): JSX.Element => {
        const labelClassName: string = classNames('textfield__label', props.labelClassName);

        return (
            <label className={labelClassName} htmlFor={props.id}>
                {props.label}
            </label>
        );
    };

    const renderInput: () => JSX.Element = (): JSX.Element => {
        const inputClassName: string = classNames('textfield__input', props.inputClassName);
        const InputElement: 'input' | 'textarea' = props.element || 'input';

        return (
            <InputElement
                {...props.attributes}
                className={inputClassName}
                type={props.type}
                id={props.id}
                name={props.name}
                disabled={props.disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                // use local state only when component is not controlled from parent
                value={typeof props.value !== 'undefined' ? props.value : value}
                onChange={handleChange}
            />
        );
    };

    return (
        <div className={className}>
            <div className="textfield__inner">
                {renderInput()}
                {renderLabel()}
            </div>
            {props.error && renderError()}
            {props.description && renderDescription()}
        </div>
    );
};

TextField.defaultProps = {
    type: 'text',
    defaultValue: '',
};

export default TextField;
