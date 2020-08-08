import React, { useState } from 'react';

import classNames from 'classnames';

export interface IRadioProps {
    label: string;
    id: string;
    name: string;
    value: string;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
    onChange?: (checked: boolean) => void;
    modifier?: string;
    className?: string;
}

const Radio = (props: IRadioProps): JSX.Element => {
    const className: string = classNames('radio', props.modifier, props.className);
    const [checked, setChecked] = useState(props.defaultChecked);

    const handleChange: (event: React.FormEvent<HTMLInputElement>) => void = (event: React.FormEvent<HTMLInputElement>): void => {
        const nextValue: boolean = event.currentTarget.checked;

        if (typeof props.checked === 'undefined') {
            setChecked(nextValue);
        }

        if (props.onChange) {
            props.onChange(nextValue);
        }
    };

    return (
        <div className={className}>
            <input
                {...props.attributes}
                type="radio"
                className="radio__input"
                id={props.id}
                name={props.name}
                value={props.value}
                disabled={props.disabled}
                // use local state only when component is not controlled from parent
                checked={typeof props.checked !== 'undefined' ? props.checked : checked}
                onChange={handleChange}
            />
            <label htmlFor={props.id} className="radio__label">
                <span className="radio__indicator" />
                <span className="radio__text">{props.label}</span>
            </label>
        </div>
    );
};

Radio.defaultProps = {
    defaultChecked: false,
};

export default Radio;
